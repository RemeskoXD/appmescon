"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";

export default function AdminPortfolio() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    image_url: "",
    description: ""
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portfolio?all=true");
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch portfolio items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        url: item.url,
        image_url: item.image_url || "",
        description: item.description || ""
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        url: "",
        image_url: "",
        description: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingItem ? `/api/portfolio/${editingItem.id}` : "/api/portfolio";
      const method = editingItem ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        handleCloseModal();
        fetchItems();
      } else {
        alert("Chyba při ukládání");
      }
    } catch (error) {
      console.error("Error saving portfolio item", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Opravdu chcete smazat tuto položku?")) return;
    
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchItems();
      } else {
        alert("Chyba při mazání");
      }
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Správa portfolia</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#5885fa] text-white rounded-lg hover:bg-[#406ee0] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Přidat projekt
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Načítání...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-[#0f1420] border border-slate-800 rounded-xl overflow-hidden flex flex-col">
              <div className="h-48 bg-slate-800 relative group">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <ImageIcon className="w-12 h-12 opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button onClick={() => handleOpenModal(item)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/40 text-red-400">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#5885fa] hover:underline mb-2 truncate">
                  {item.url}
                </a>
                <p className="text-sm text-slate-400 line-clamp-2 mt-auto">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0f1420] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">
                {editingItem ? "Upravit projekt" : "Nový projekt"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Název (např. doména)</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  placeholder="např. mescon.cz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">URL adresa</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  placeholder="https://www.mescon.cz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">URL obrázku (volitelné)</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  placeholder="Nechte prázdné pro automatický screenshot"
                />
                <p className="text-xs text-slate-500 mt-1">Pokud nevyplníte, systém se pokusí vygenerovat náhled webu automaticky.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Popis</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#5885fa]"
                  placeholder="Krátký popis projektu..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#5885fa] text-white rounded-lg hover:bg-[#406ee0] transition-colors"
                >
                  Uložit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
