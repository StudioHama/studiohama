"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import "quill-resize-module/dist/resize.css";

const BUCKET = "public-media";
const BLOG_CONTENT_PATH = "blog-content";
const DEFAULT_CATEGORY = "소식";

const QUILL_MODULES = (imageHandler: () => void) => ({
  toolbar: {
    container: [
      [{ font: ["", "gowun-dodum", "nanum-myeongjo", "nanum-gothic", "jua", "gowun-batang", "nanum-pen"] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic"],
      [{ align: [] }],
      ["image"],
    ],
    handlers: {
      image: imageHandler,
    },
  },
  resize: {
    modules: ["DisplaySize", "Toolbar", "Resize", "Keyboard"],
    parchment: {
      image: {
        attribute: ["width"],
        limit: { minWidth: 80, maxWidth: 1200 },
      },
    },
    tools: ["left", "center", "right", "full"],
  },
});

const QUILL_FORMATS = [
  "font",
  "header",
  "bold",
  "italic",
  "align",
  "image",
  "resize-inline",
  "resize-block",
];

export default function AdminPostsNewPage() {
  const [title, setTitle] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<React.ComponentRef<typeof ReactQuill> | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const uploadImageAndInsert = useCallback(async (file: File) => {
    const editor = (quillRef.current as { getEditor?: () => { getSelection: (x: boolean) => { index: number; length: number } | null; getLength: () => number; insertEmbed: (i: number, t: string, u: string, s: string) => void; setSelection: (i: number, l: number) => void } })?.getEditor?.();
    if (!editor) return;
    const range = editor.getSelection(true) ?? { index: editor.getLength(), length: 0 };

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${BLOG_CONTENT_PATH}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
    if (error) {
      alert(`이미지 업로드 실패: ${error.message}`);
      return;
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    editor.insertEmbed(range.index, "image", data.publicUrl, "user");
    editor.setSelection(range.index + 1, 0);
  }, [supabase]);

  const [editorReady, setEditorReady] = useState(false);
  useEffect(() => {
    const init = async () => {
      const Quill = (await import("quill")).default;
      const QuillResize = (await import("quill-resize-module")).default;
      Quill.register("modules/resize", QuillResize);
      const Font = Quill.import("formats/font");
      (Font as { whitelist: string[] }).whitelist = ["gowun-dodum", "nanum-myeongjo", "nanum-gothic", "jua", "gowun-batang", "nanum-pen"];
      Quill.register("formats/font", Font, true);
      setEditorReady(true);
    };
    init();
  }, []);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) await uploadImageAndInsert(file);
    };
  }, [uploadImageAndInsert]);

  const handleEditorDrop = useCallback(async (e: React.DragEvent) => {
    const file = e.dataTransfer?.files?.[0];
    if (file?.type.startsWith("image/")) {
      e.preventDefault();
      e.stopPropagation();
      await uploadImageAndInsert(file);
    }
  }, [uploadImageAndInsert]);

  const modules = QUILL_MODULES(imageHandler);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setThumbnailFile(null);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      setThumbnailPreview(null);
    }
  }

  function clearThumbnail() {
    setThumbnailFile(null);
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    const contentText = content.replace(/<p><br><\/p>/g, "").trim();
    if (!contentText || contentText === "<p></p>") {
      alert("내용을 입력해주세요.");
      return;
    }

    setSaving(true);
    try {
      let thumbnailUrl: string | null = null;

      if (thumbnailFile) {
        const ext = thumbnailFile.name.split(".").pop() || "jpg";
        const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, thumbnailFile, { upsert: true });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          const msg = uploadError.message || JSON.stringify(uploadError);
          if (msg.includes("Bucket") || msg.includes("bucket")) {
            alert("Storage 버킷이 없습니다. Supabase Dashboard > Storage에서 'public-media' 버킷을 생성해주세요. (docs/STORAGE_SETUP.md 참고)");
          } else {
            alert(`이미지 업로드 실패: ${msg}`);
          }
          setSaving(false);
          return;
        }

        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        thumbnailUrl = urlData.publicUrl;
      }

      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("posts").insert({
        title: title.trim(),
        content: content.trim(),
        category: DEFAULT_CATEGORY,
        tag: DEFAULT_CATEGORY,
        thumbnail_url: thumbnailUrl,
        external_url: externalUrl.trim() || null,
        author_id: user?.id ?? null,
      });

      if (error) {
        const msg = error.message || error.code || JSON.stringify(error);
        throw new Error(msg);
      }
      alert("✅ 게시글이 등록되었습니다.");
      router.push("/intro/blog");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Save error:", err);
      alert(`저장 중 오류가 발생했습니다. ${msg}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">게시글 작성</h1>
        <p className="text-sm text-gray-600 mt-1">
          소식 페이지에 게시될 콘텐츠를 작성합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            썸네일 이미지
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {thumbnailPreview && (
            <div className="mt-2 relative inline-block">
              <img
                src={thumbnailPreview}
                alt="미리보기"
                className="h-24 w-auto rounded-lg border border-gray-200 object-cover"
              />
              <button
                type="button"
                onClick={clearThumbnail}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="externalUrl" className="block text-sm font-medium text-gray-700 mb-1">
            외부 링크 (선택)
          </label>
          <input
            id="externalUrl"
            type="url"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://..."
          />
          <p className="text-xs text-gray-500 mt-1">
            언론보도인 경우 기사 링크를 입력하세요.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            내용
          </label>
          <div
            className="quill-editor-wrapper [&_.ql-container]:min-h-[280px] [&_.ql-editor]:min-h-[260px]"
            onDrop={handleEditorDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {!editorReady ? (
              <div className="min-h-[280px] flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
                에디터 로딩 중...
              </div>
            ) : (
            <ReactQuill
              {...({ ref: quillRef } as object)}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={QUILL_FORMATS}
              placeholder="내용을 입력하세요. 이미지는 드래그 앤 드롭 또는 이미지 버튼으로 추가할 수 있습니다."
              className="[&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:rounded-b-lg [&_.ql-editor]:rounded-b-lg"
            />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            이미지 버튼 클릭 또는 드래그 앤 드롭으로 본문에 사진을 추가할 수 있습니다. 이미지를 클릭하면 크기 조절 핸들이 나타납니다.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
          >
            {saving ? "저장 중..." : "등록하기"}
          </button>
          <Link
            href="/intro/blog"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            취소
          </Link>
        </div>
      </form>

    </div>
  );
}
