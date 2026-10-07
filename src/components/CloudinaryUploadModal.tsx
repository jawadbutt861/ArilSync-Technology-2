import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Check,
  X,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import {
  uploadToCloudinary,
  isCloudinaryConfigured,
  cloudinaryConfig,
  CURATED_PROJECT_IMAGES,
} from '../services/cloudinary';

interface CloudinaryUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelected: (url: string) => void;
  currentImageUrl?: string;
  title?: string;
}

export const CloudinaryUploadModal: React.FC<CloudinaryUploadModalProps> = ({
  isOpen,
  onClose,
  onImageSelected,
  currentImageUrl = '',
  title = 'Select or Upload Project Image',
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'curated' | 'url'>('curated');
  const [customUrl, setCustomUrl] = useState(currentImageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string>(currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size exceeds 8MB limit.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadToCloudinary(file);
      setSelectedPreview(result.url);
      setCustomUrl(result.url);
      if (result.isSimulated && !isCloudinaryConfigured) {
        console.info('Image cached locally for preview. Configure Cloudinary env variables for production cloud hosting.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed. Please check network connection.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedPreview) {
      onImageSelected(selectedPreview);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cloudinary Media Hosting & Studio Asset Selector
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cloudinary Status Note */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isCloudinaryConfigured ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
            />
            <span className="text-slate-600 font-medium">
              {isCloudinaryConfigured
                ? `Connected: Cloudinary (${cloudinaryConfig.cloudName})`
                : 'Development Asset Mode (Pre-loaded 8k assets available)'}
            </span>
          </div>
          {!isCloudinaryConfigured && (
            <span className="text-slate-400 text-xs hidden sm:inline">
              Set VITE_CLOUDINARY_* in .env for custom cloud
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-6 pt-2">
          <button
            onClick={() => setActiveTab('curated')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-px transition-colors flex items-center gap-1.5 ${
              activeTab === 'curated'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Curated Studio Assets
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-px transition-colors flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-px transition-colors flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Direct URL
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{uploadError}</span>
            </div>
          )}

          {activeTab === 'curated' && (
            <div>
              <p className="text-xs text-slate-500 mb-3">
                Select from high-definition engineering assets generated specifically for Arilsync Technology:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {CURATED_PROJECT_IMAGES.map((img) => {
                  const isSelected = selectedPreview === img.url;
                  return (
                    <div
                      key={img.url}
                      onClick={() => {
                        setSelectedPreview(img.url);
                        setCustomUrl(img.url);
                      }}
                      className={`group relative rounded-lg overflow-hidden border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-2.5 bg-white flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-slate-900 truncate">{img.name}</p>
                          <p className="text-[10px] text-slate-500">{img.category}</p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {isUploading ? 'Uploading to Media Host...' : 'Click to select project image'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PNG, JPG, or WEBP up to 8MB
                </p>
              </div>

              {selectedPreview && (
                <div className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Uploaded Preview:</p>
                  <div className="aspect-video max-h-48 rounded overflow-hidden bg-slate-100">
                    <img
                      src={selectedPreview}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  External or Cloudinary Image URL
                </label>
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setSelectedPreview(e.target.value);
                  }}
                  placeholder="https://res.cloudinary.com/your-cloud/image/upload/..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              {customUrl && (
                <div className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Preview:</p>
                  <div className="aspect-video max-h-48 rounded overflow-hidden bg-slate-100">
                    <img
                      src={customUrl}
                      alt="Custom Preview"
                      className="w-full h-full object-cover"
                      onError={() => setUploadError('Unable to load image from provided URL.')}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500 truncate max-w-xs">
            {selectedPreview ? '1 image selected' : 'No image chosen'}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!selectedPreview || isUploading}
              onClick={handleConfirm}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Use Selected Image
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
