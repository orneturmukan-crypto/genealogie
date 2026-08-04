import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Trash2, Edit2, Download, Upload, X } from 'lucide-react';

export default function GenealogyApp() {
  const [individuals, setIndividuals] = useState(() => {
    const saved = localStorage.getItem('genealogyData');
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGeneration, setFilterGeneration] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [expandedNode, setExpandedNode] = useState(null);
  const [photoModal, setPhotoModal] = useState(null);

  const [formData, setFormData] = useState({
    sosaNummer: '',
    prenom: '',
    nom: '',
    naissance: '',
    deces: '',
    lieuNaissance: '',
    lieuDeces: '',
    mariageDate: '',
    lieuMariage: '',
    notes: '',
    photo: '',
    blason: '',
    conjoint: '',
    pays: 'France',
  });

  useEffect(() => {
    localStorage.setItem('genealogyData', JSON.stringify(individuals));
  }, [individuals]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getFlagEmoji = (country) => {
    const flags = {
      'France': '🇫🇷',
      'Italie': '🇮🇹',
      'Espagne': '🇪🇸',
      'Allemagne': '🇩🇪',
      'Suisse': '🇨🇭',
      'Belgique': '🇧🇪',
      'Royaume-Uni': '🇬🇧',
      'États-Unis': '🇺🇸',
      'Canada': '🇨🇦',
      'Autre': '🌍',
    };
    return flags[country] || '🌍';
  };

  const getGenerationFromSosa = (sosa) => {
    if (!sosa) return 0;
    const num = parseInt(sosa);
    return Math.floor(Math.log2(num)) + 1;
  };

  const getParentSosa = (sosa) => {
    const num = parseInt(sosa);
    if (!num || num === 1) return null;
    return Math.floor(num / 2);
  };

  const getChildren = (sosa) => {
    const sosaNumerator = parseInt(sosa);
    return individuals.filter(ind => {
      const indSosa = parseInt(ind.sosaNummer);
      const parentSosa = getParentSosa(indSosa);
      return parentSosa === sosaNumerator;
    });
  };

  const getIndividualBySosa = (sosa) => {
    const sosaNumerator = parseInt(sosa);
    return individuals.find(ind => parseInt(ind.sosaNummer) === sosaNumerator);
  };

  const resetForm = () => {
    setFormData({
      sosaNummer: '',
      prenom: '',
      nom: '',
      naissance: '',
      deces: '',
      lieuNaissance: '',
      lieuDeces: '',
      mariageDate: '',
      lieuMariage: '',
      notes: '',
      photo: '',
      blason: '',
      conjoint: '',
      pays: 'France',
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sosaNummer || !formData.prenom || !formData.nom) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }

    const formDataToSave = {
      ...formData,
      sosaNummer: parseInt(formData.sosaNummer)
    };

    if (editingId) {
      setIndividuals(
        individuals.map(ind => (ind.id === editingId ? { ...formDataToSave, id: editingId } : ind))
      );
    } else {
      setIndividuals([...individuals, { ...formDataToSave, id: Date.now() }]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (individual) => {
    setFormData({
      ...individual,
      sosaNummer: individual.sosaNummer.toString()
    });
    setEditingId(individual.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette personne ?')) {
      setIndividuals(individuals.filter(ind => ind.id !== id));
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(individuals, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `genealogie_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        setIndividuals(imported);
        alert('Données importées avec succès !');
      } catch (err) {
        alert('Erreur lors de l\'importation : ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const filteredIndividuals = individuals.filter(ind => {
    const matchesSearch =
      ind.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.nom.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGeneration =
      filterGeneration === 'all' ||
      getGenerationFromSosa(ind.sosaNummer).toString() === filterGeneration;

    return matchesSearch && matchesGeneration;
  });

  const TreeNode = ({ sosaNummer }) => {
    const individual = getIndividualBySosa(sosaNummer);
    const children = getChildren(sosaNummer);
    const isExpanded = expandedNode === sosaNummer;

    if (!individual) return null;

    return (
      <div className="mb-2">
        <div className="flex items-center gap-2 p-2 bg-amber-50 rounded border-l-4 border-amber-700 hover:bg-amber-100 transition">
          {children.length > 0 && (
            <button
              onClick={() => setExpandedNode(isExpanded ? null : sosaNummer)}
              className="p-1 hover:bg-amber-200 rounded"
            >
              <ChevronDown size={16} className={`transition ${isExpanded ? '' : '-rotate-90'}`} />
            </button>
          )}
          {children.length === 0 && <div className="w-6"></div>}
          <div className="flex-1">
            <div className="font-semibold text-amber-900">
              {individual.sosaNummer} - {individual.prenom} {individual.nom.toUpperCase()}
            </div>
            <div className="text-xs text-amber-700">
              {individual.naissance && `Né le ${formatDate(individual.naissance)}`}
            </div>
          </div>
        </div>
        {isExpanded && children.length > 0 && (
          <div className="ml-4 border-l border-amber-300">
            {children.map(child => (
              <TreeNode key={child.id} sosaNummer={child.sosaNummer} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const ListView = () => (
    <div className="space-y-3">
      {filteredIndividuals.length === 0 ? (
        <div className="text-center py-8 text-amber-700">
          Aucun résultat. {individuals.length === 0 && 'Commencez par ajouter une personne.'}
        </div>
      ) : (
        filteredIndividuals.map(ind => (
          <div key={ind.id} className="p-4 bg-white border-l-4 border-amber-700 rounded hover:shadow-md transition">
            <div className="flex items-start justify-between gap-4">
              <div 
                className="flex-1 cursor-pointer hover:opacity-80 transition"
                onClick={() => ind.photo && setPhotoModal({ src: ind.photo, title: ind.prenom + ' ' + ind.nom })}
              >
                <div className="font-bold text-amber-900 text-lg">
                  {ind.sosaNummer} - {ind.prenom} {ind.nom.toUpperCase()}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Génération {getGenerationFromSosa(ind.sosaNummer)}
                  {ind.naissance && ` • Né le ${formatDate(ind.naissance)}`}
                  {ind.deces && ` • Décédé le ${formatDate(ind.deces)}`}
                </div>
                {ind.lieuNaissance && <div className="text-xs text-gray-500">📍 Né à {ind.lieuNaissance}</div>}
                {ind.lieuDeces && <div className="text-xs text-gray-500">📍 Décédé à {ind.lieuDeces}</div>}
                {ind.conjoint && <div className="text-xs text-amber-700">💑 Conjoint: {ind.conjoint}</div>}
                {ind.mariageDate && (
                  <div className="text-xs text-amber-700">
                    💍 Marié le {formatDate(ind.mariageDate)}
                    {ind.lieuMariage && ` à ${ind.lieuMariage}`}
                  </div>
                )}
                {ind.notes && <div className="text-xs text-gray-600 mt-2 italic">{ind.notes}</div>}
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="text-3xl">{getFlagEmoji(ind.pays || 'France')}</div>

                {ind.blason && (
                  <img
                    src={ind.blason}
                    alt="Blason"
                    className="hover:scale-110 transition cursor-pointer"
                    style={{ width: '60px', height: '66px', objectFit: 'cover' }}
                    title="Blason"
                    onClick={() => setPhotoModal({ src: ind.blason, title: 'Blason - ' + ind.prenom })}
                  />
                )}
              </div>

              <div className="flex gap-2 flex-col">
                <button
                  onClick={() => handleEdit(ind)}
                  className="p-2 text-amber-700 hover:bg-amber-100 rounded transition"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(ind.id)}
                  className="p-2 text-red-700 hover:bg-red-100 rounded transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const TreeView = () => (
    <div className="p-4 bg-amber-50 rounded border border-amber-200 overflow-x-auto">
      <TreeNode sosaNummer={1} />
      {individuals.length === 0 && (
        <div className="text-center py-8 text-amber-700">
          Ajoutez une personne (numéro Sosa: 1) pour commencer l'arbre généalogique.
        </div>
      )}
    </div>
  );

  const PhotoModal = () => {
    if (!photoModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto relative">
          <button
            onClick={() => setPhotoModal(null)}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 z-10"
          >
            <X size={24} />
          </button>
          <div className="p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">{photoModal.title}</h2>
            <img
              src={photoModal.src}
              alt={photoModal.title}
              className="w-full h-auto rounded border-2 border-amber-700"
            />
          </div>
        </div>
      </div>
    );
  };

  const Stats = () => {
    const generations = new Set(individuals.map(ind => getGenerationFromSosa(ind.sosaNummer)));
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-amber-50 rounded border border-amber-200">
          <div className="text-2xl font-bold text-amber-900">{individuals.length}</div>
          <div className="text-xs text-amber-700">Individus</div>
        </div>
        <div className="p-3 bg-amber-50 rounded border border-amber-200">
          <div className="text-2xl font-bold text-amber-900">{generations.size}</div>
          <div className="text-xs text-amber-700">Générations</div>
        </div>
        <div className="p-3 bg-amber-50 rounded border border-amber-200">
          <div className="text-2xl font-bold text-amber-900">
            {individuals.filter(ind => !ind.deces).length}
          </div>
          <div className="text-xs text-amber-700">Vivants</div>
        </div>
        <div className="p-3 bg-amber-50 rounded border border-amber-200">
          <div className="text-2xl font-bold text-amber-900">
            {individuals.filter(ind => ind.deces).length}
          </div>
          <div className="text-xs text-amber-700">Décédés</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4E8D8' }}>
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white p-6 safe-area-inset-top">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          📚 Mon Arbre Généalogique
        </h1>
        <p className="text-amber-100 text-sm md:text-base">Système Sosa-Stradonitz • {individuals.length} individu(s)</p>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 pb-20 md:pb-6">
        <Stats />

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 space-y-4">
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition font-medium text-sm md:text-base"
            >
              <Plus size={18} />
              Ajouter
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-amber-700 text-amber-700 rounded hover:bg-amber-50 transition text-sm md:text-base"
            >
              <Download size={18} />
              Exporter
            </button>

            <label className="flex items-center gap-2 px-4 py-2 border border-amber-700 text-amber-700 rounded hover:bg-amber-50 transition cursor-pointer text-sm md:text-base">
              <Upload size={18} />
              Importer
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
            />

            <div className="flex flex-wrap gap-3">
              <select
                value={filterGeneration}
                onChange={(e) => setFilterGeneration(e.target.value)}
                className="px-4 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
              >
                <option value="all">Toutes générations</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(gen => (
                  <option key={gen} value={gen}>
                    Génération {gen}
                  </option>
                ))}
              </select>

              <div className="flex gap-1 border border-amber-300 rounded p-1 bg-white">
                {[
                  { mode: 'list', icon: '📋', label: 'Liste' },
                  { mode: 'tree', icon: '🌳', label: 'Arbre' },
                ].map(({ mode, icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 rounded transition text-sm font-medium ${
                      viewMode === mode
                        ? 'bg-amber-700 text-white'
                        : 'text-amber-700 hover:bg-amber-50'
                    }`}
                    title={label}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showForm ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-4">
              {editingId ? '✏️ Modifier' : '➕ Ajouter une personne'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Numéro Sosa *
                  </label>
                  <input
                    type="number"
                    value={formData.sosaNummer}
                    onChange={(e) => setFormData({ ...formData, sosaNummer: e.target.value })}
                    placeholder="ex: 1, 2, 3..."
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Génération: {formData.sosaNummer ? getGenerationFromSosa(formData.sosaNummer) : '-'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Pays
                  </label>
                  <select
                    value={formData.pays}
                    onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  >
                    <option>France</option>
                    <option>Italie</option>
                    <option>Espagne</option>
                    <option>Allemagne</option>
                    <option>Suisse</option>
                    <option>Belgique</option>
                    <option>Royaume-Uni</option>
                    <option>États-Unis</option>
                    <option>Canada</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Conjoint(e)
                  </label>
                  <input
                    type="text"
                    value={formData.conjoint}
                    onChange={(e) => setFormData({ ...formData, conjoint: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Naissance
                  </label>
                  <input
                    type="date"
                    value={formData.naissance}
                    onChange={(e) => setFormData({ ...formData, naissance: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Décès
                  </label>
                  <input
                    type="date"
                    value={formData.deces}
                    onChange={(e) => setFormData({ ...formData, deces: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Lieu de naissance
                  </label>
                  <input
                    type="text"
                    value={formData.lieuNaissance}
                    onChange={(e) => setFormData({ ...formData, lieuNaissance: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Lieu de décès
                  </label>
                  <input
                    type="text"
                    value={formData.lieuDeces}
                    onChange={(e) => setFormData({ ...formData, lieuDeces: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Date de mariage
                  </label>
                  <input
                    type="date"
                    value={formData.mariageDate}
                    onChange={(e) => setFormData({ ...formData, mariageDate: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    Lieu de mariage
                  </label>
                  <input
                    type="text"
                    value={formData.lieuMariage}
                    onChange={(e) => setFormData({ ...formData, lieuMariage: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    URL Photo
                  </label>
                  <input
                    type="url"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-1">
                    URL Blason 🛡️
                  </label>
                  <input
                    type="url"
                    value={formData.blason}
                    onChange={(e) => setFormData({ ...formData, blason: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-amber-200">
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition font-medium text-sm"
                >
                  {editingId ? 'Mettre à jour' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-amber-700 text-amber-700 rounded hover:bg-amber-50 transition text-sm"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {viewMode === 'list' && <ListView />}
            {viewMode === 'tree' && <TreeView />}
          </>
        )}
      </div>

      <PhotoModal />
    </div>
  );
}
