import React from 'react';
import { FileText, Share2, Clock, ArrowLeft } from 'lucide-react';

export const PanicOverlay = ({ onExit }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white text-slate-900 flex flex-col font-sans select-text overflow-y-auto">
      {/* Fake Google Docs Top Navigation */}
      <header className="border-b border-slate-200 px-4 py-2 flex items-center justify-between bg-white text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-800">
                AP World History - Post-Classical Era Study Guide
              </span>
              <span className="text-[11px] text-slate-400">Saved to Drive</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-0.5">
              <span className="hover:text-black cursor-pointer">File</span>
              <span className="hover:text-black cursor-pointer">Edit</span>
              <span className="hover:text-black cursor-pointer">View</span>
              <span className="hover:text-black cursor-pointer">Insert</span>
              <span className="hover:text-black cursor-pointer">Format</span>
              <span className="hover:text-black cursor-pointer">Tools</span>
              <span className="hover:text-black cursor-pointer">Extensions</span>
              <span className="hover:text-black cursor-pointer">Help</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>Last edit was 2 minutes ago</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          {/* Subtle exit panic button */}
          <button
            onClick={onExit}
            title="Press \ or click here to return"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer text-xs flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-[11px]">Resume (\)</span>
          </button>
        </div>
      </header>

      {/* Fake Google Docs Document Body */}
      <main className="flex-1 bg-slate-100 py-8 px-4 flex justify-center">
        <div className="bg-white shadow-md border border-slate-200 rounded-sm w-full max-w-3xl min-h-[1050px] p-12 text-slate-800 space-y-6 text-sm leading-relaxed">
          <h1 className="text-2xl font-bold text-slate-900 border-b pb-2">
            Unit 2: Networks of Exchange (1200 - 1450 CE)
          </h1>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              1. The Silk Roads & Afro-Eurasian Trade Networks
            </h2>
            <p className="text-slate-700">
              During the period 1200–1450, commercial expansion along overland routes was facilitated by innovations in previously existing transportation and commercial technologies. The establishment of caravanserai provided rest and defense for traveling merchant caravans spanning the Eurasian continent from China to Constantinople.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><b>Key Innovations:</b> Flying cash (paper currency), bills of exchange, banking houses, and the magnetic compass.</li>
              <li><b>Commodities Exchanged:</b> Silk, porcelain, spices, gunpowder, paper technology, and luxury textiles.</li>
              <li><b>Pax Mongolica:</b> The unification of central Eurasia under Genghis Khan and successor khanates provided unprecedented diplomatic stability and safe passage for merchants.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              2. Indian Ocean Maritime Trade Network
            </h2>
            <p className="text-slate-700">
              Maritime trade in the Indian Ocean basin fostered trans-regional commercial and cultural exchange. Knowledge of monsoon wind patterns was fundamental: sailors navigated southwest towards the Swahili Coast during winter months and northeast toward India and the Malacca Strait during the summer monsoon cycle.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><b>Diasporic Communities:</b> Arab and Persian merchants set up permanent trading diasporas across Gujarat, Calicut, and coastal Southeast Asia.</li>
              <li><b>Navigational Instruments:</b> Astrolabe, lateen sails, stern-post rudders, and dhow ship construction.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              3. Trans-Saharan Trade Routes & West African Empires
            </h2>
            <p className="text-slate-700">
              The introduction of the camel saddle transformed the Sahara Desert from an insurmountable barrier into a vibrant commercial artery connecting sub-Saharan West Africa with the Mediterranean and Islamic world.
            </p>
            <p className="text-slate-700">
              Timbuktu emerged as a renowned intellectual and mercantile hub boasting prestigious madrasas and manuscript archives under the patronage of Mansa Musa and the Mali Empire.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-200 text-xs text-slate-400 flex justify-between items-center">
            <span>Page 1 of 4</span>
            <span onClick={onExit} className="cursor-pointer hover:underline text-slate-500">
              Click here or press \ on keyboard to resume
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
