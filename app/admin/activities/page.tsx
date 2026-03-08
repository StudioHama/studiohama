"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useRef, useCallback } from "react";
import { normalizeImage } from "@/lib/upload-image";

type Activity = {
  id: string;
  year: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  created_at: string;
};

const CATEGORIES = ["공연", "오페라", "합창", "민요", "행사", "기타"];

const EMPTY_FORM = {
  year: "",
  title: "",
  description: "",
  category: "공연",
  image_url: "",
};

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/activities");
      if (res.ok) setActivities(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview(null);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("activity-form")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function openEdit(a: Activity) {
    setEditingId(a.id);
    setForm({
      year: a.year,
      title: a.title,
      description: a.description ?? "",
      category: a.category,
      image_url: a.image_url ?? "",
    });
    setImageFile(null);
    setImagePreview(a.image_url ?? null);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("activity-form")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setImageFile(null);
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
  }

  function clearImage() {
    setImageFile(null);
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setForm((f) => ({ ...f, image_url: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.year.trim() || !form.title.trim()) return;
    setSaving(true);

    try {
      let imageUrl: string | null = form.image_url || null;

      // Upload new image if selected (client-side WebP compression → server upload)
      if (imageFile) {
        const fd = new FormData();
        try {
          const { blob, ext } = await normalizeImage(imageFile);
          fd.append("file", blob, `image.${ext}`);
        } catch {
          // fallback: send original file
          fd.append("file", imageFile, imageFile.name);
        }

        const uploadRes = await fetch("/api/admin/activities/upload", {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          alert(`이미지 업로드 실패: ${err.error}`);
          return;
        }
        const { url } = await uploadRes.json();
        imageUrl = url;
      }

      const payload = {
        ...(editingId ? { id: editingId } : {}),
        year: form.year.trim(),
        title: form.title.trim(),
        description: form.description.trim() || null,
        category: form.category,
        image_url: imageUrl,
      };

      const res = await fetch("/api/admin/activities", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`저장 실패: ${err.error}`);
        return;
      }

      handleCancel();
      await fetchActivities();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}"을(를) 삭제하시겠습니까?`)) return;
    setDeleting(id);
    try {
      await fetch("/api/admin/activities", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await fetchActivities();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">활동 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            공연, 오페라, 합창 등 활동 이력을 관리합니다. 이미지는 업로드 시 WebP로 자동 변환됩니다.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={openNew}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
          >
            + 새 활동 추가
          </button>
        )}
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <form
          id="activity-form"
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            {editingId ? "활동 수정" : "새 활동 추가"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연도 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                placeholder="예: 2024, 2015 – 2022"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="공연 / 활동 제목"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">설명 (선택)</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="장소, 간단한 설명 등"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                사진 (선택)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-400 mt-1">
                업로드 시 자동으로 WebP 형식으로 압축 변환됩니다 (최대 1600px, quality 0.85).
              </p>
              {imagePreview && (
                <div className="mt-3 relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="미리보기"
                    className="h-28 w-auto rounded-lg border border-gray-200 object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label="이미지 제거"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {saving ? "저장 중..." : editingId ? "수정 완료" : "추가"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      )}

      {/* Activity List */}
      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">불러오는 중...</div>
      ) : activities.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-5xl mb-4">🎭</p>
          <p className="text-gray-600 font-medium">아직 등록된 활동이 없습니다.</p>
          <p className="text-sm text-gray-400 mt-1">위 버튼으로 첫 활동을 추가해보세요.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left border-b border-gray-200">
                <th className="px-4 py-3 font-medium text-gray-600 w-24">연도</th>
                <th className="px-4 py-3 font-medium text-gray-600">제목 / 설명</th>
                <th className="px-4 py-3 font-medium text-gray-600 w-20 hidden sm:table-cell">카테고리</th>
                <th className="px-4 py-3 font-medium text-gray-600 w-16 hidden md:table-cell">사진</th>
                <th className="px-4 py-3 font-medium text-gray-600 w-28 text-right">관리</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs whitespace-nowrap align-top pt-4">
                    {a.year}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{a.title}</p>
                    {a.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{a.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell align-top pt-4">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {a.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell align-top pt-4">
                    {a.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.image_url}
                        alt={a.title}
                        className="w-14 h-10 object-cover rounded border border-gray-200"
                      />
                    ) : (
                      <span className="text-gray-300 text-xs">없음</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right align-top pt-3">
                    <div className="flex gap-1 justify-end">
                      <button
                        onClick={() => openEdit(a)}
                        className="px-2.5 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(a.id, a.title)}
                        disabled={deleting === a.id}
                        className="px-2.5 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === a.id ? "..." : "삭제"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
