import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../types";

interface LegalModalProps {
  type: "privacy" | "terms" | "disclaimer" | null;
  language: Language;
  onClose: () => void;
}

export default function LegalModal({ type, language, onClose }: LegalModalProps) {
  if (!type) return null;

  const content: Record<Language, Record<"privacy" | "terms" | "disclaimer", { title: string; body: string[] }>> = {
    ID: {
      privacy: {
        title: "Kebijakan Privasi",
        body: [
          "Terakhir Diperbarui: 12 Juli 2026",
          "Di SaveTok, kami memprioritaskan privasi Anda. Kebijakan Privasi ini menguraikan jenis informasi yang kami kumpulkan dan bagaimana kami menggunakannya.",
          "1. Pengumpulan Informasi: SaveTok adalah layanan gratis dan sepenuhnya stateless. Kami tidak menyimpan, mengunggah, atau menyimpan tautan video, data pengunduh, atau riwayat unduhan apa pun di server kami. Semua analisis tautan dilakukan secara langsung (real-time) dan bersifat sementara.",
          "2. Data Analitik Standar: Kami mungkin menggunakan layanan analitik pihak ketiga standar (seperti Google Analytics) untuk mengumpulkan data statistik anonim tentang penggunaan situs untuk meningkatkan kualitas layanan. Ini termasuk informasi dasar seperti browser yang digunakan, waktu kunjungan, dan halaman yang dikunjungi.",
          "3. Google AdSense: Kami menggunakan Google AdSense untuk menayangkan iklan. Google menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan pengguna sebelumnya ke situs ini atau situs lainnya.",
          "4. Kontak Kami: Jika Anda memiliki pertanyaan atau masukan tentang kebijakan privasi kami, silakan hubungi tim kami di support@savetok.co."
        ],
      },
      terms: {
        title: "Syarat dan Ketentuan Layanan",
        body: [
          "Terakhir Diperbarui: 12 Juli 2026",
          "Silakan baca Syarat Layanan ini sebelum menggunakan situs pengunduh video SaveTok.",
          "1. Penerimaan Syarat: Dengan mengakses dan menggunakan situs kami, Anda menyetujui seluruh syarat dan ketentuan yang diuraikan di sini.",
          "2. Penggunaan yang Diizinkan: SaveTok dirancang untuk penggunaan pribadi dan non-komersial saja. Anda bertanggung jawab penuh untuk memastikan bahwa Anda memiliki izin yang sah untuk mengunduh dan menyimpan video dari pembuat konten asli.",
          "3. Hak Cipta & Kepemilikan Intelektual: SaveTok menghormati hak kekayaan intelektual orang lain. Anda dilarang menggunakan platform ini untuk mendistribusikan materi berhak cipta tanpa izin tertulis dari pemegang hak cipta asli.",
          "4. Batasan Tanggung Jawab: SaveTok disediakan 'apa adanya' tanpa jaminan dalam bentuk apa pun. Kami tidak bertanggung jawab atas segala kerugian, kerusakan, atau masalah hukum yang timbul dari penggunaan atau ketidakmampuan menggunakan alat pengunduhan kami."
        ],
      },
      disclaimer: {
        title: "Penafian (Disclaimer)",
        body: [
          "Terakhir Diperbarui: 12 Juli 2026",
          "Informasi dan layanan pengunduhan yang disediakan di SaveTok ditujukan murni sebagai utilitas bantu.",
          "1. Afiliasi: SaveTok adalah aplikasi independen yang sepenuhnya gratis. Kami TIDAK berafiliasi, disponsori, disetujui, atau dengan cara apa pun terhubung secara resmi dengan TikTok, ByteDance Ltd., atau anak perusahaannya.",
          "2. Hak Cipta Konten: Semua merek dagang, logo, video, musik, dan nama pembuat konten asli yang ditampilkan di situs adalah milik dari pemiliknya masing-masing. Pengguna harus mengunduh konten hanya untuk tujuan pribadi dan mendidik, serta mematuhi aturan hak cipta setempat.",
          "3. Jaminan Layanan: Kami berusaha menjaga agar layanan ini tetap cepat, aman, dan tanpa watermark. Namun, kami tidak menjamin layanan ini akan bebas dari gangguan, aman dari kesalahan, atau selalu tersedia secara terus-menerus karena perubahan kebijakan teknis dari pihak ketiga."
        ],
      }
    },
    EN: {
      privacy: {
        title: "Privacy Policy",
        body: [
          "Last Updated: July 12, 2026",
          "At SaveTok, we highly prioritize your privacy. This Privacy Policy outlines the types of information we collect and how we use it.",
          "1. Information Collection: SaveTok is a free and completely stateless utility. We do not store, host, or save any processed video links, downloader details, or download histories on our servers. All processing is transient and processed in real-time.",
          "2. Standard Analytical Data: We may use standard third-party analytics (such as Google Analytics) to gather anonymous stats regarding site usage to improve service quality. This includes basic details like browser type, visit timestamps, and pages viewed.",
          "3. Google AdSense: We use Google AdSense to serve ads. Google uses cookies to serve ads based on user visits to this site or other websites.",
          "4. Contact Us: If you have questions or feedback regarding our privacy policy, please contact our team at support@savetok.co."
        ],
      },
      terms: {
        title: "Terms of Service",
        body: [
          "Last Updated: July 12, 2026",
          "Please read these Terms of Service carefully before utilizing the SaveTok video downloading platform.",
          "1. Acceptance of Terms: By accessing and utilizing our website, you agree to comply with all terms and conditions outlined here.",
          "2. Permitted Use: SaveTok is intended strictly for personal, non-commercial use. You are solely responsible for ensuring you have valid permissions to download and save media from the original content creators.",
          "3. Copyright & Intellectual Property: SaveTok respects intellectual property rights. You are prohibited from using this platform to distribute copyrighted materials without explicit written consent from the rights holders.",
          "4. Limitation of Liability: SaveTok is provided on an 'as is' basis without warranties. We are not liable for any losses, damages, or legal actions arising from the usage or inability to use our tools."
        ],
      },
      disclaimer: {
        title: "Disclaimer",
        body: [
          "Last Updated: July 12, 2026",
          "The information and download facilities provided on SaveTok are purely for educational and helper utility purposes.",
          "1. Affiliation: SaveTok is an independent free utility. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with TikTok, ByteDance Ltd., or any of their subsidiaries.",
          "2. Content Ownership: All trademarks, logos, videos, audio, and creator details displayed are properties of their respective owners. Users must obtain permission from the original creators before using downloaded content.",
          "3. Service Warranties: While we strive to keep our downloader fast, secure, and fully operational, we do not guarantee uninterrupted or error-free operations due to technical structural changes made by third-party systems."
        ],
      }
    },
    ES: {
      privacy: {
        title: "Política de Privacidad",
        body: [
          "Última actualización: 12 de julio de 2026",
          "En SaveTok, priorizamos tu privacidad. Esta política de privacidad describe los tipos de información que recopilamos y cómo la utilizamos.",
          "1. Recopilación de información: SaveTok es un servicio gratuito y completamente sin estado. No almacenamos, alojamos ni guardamos ningún enlace de video procesado, detalles del descargador o historial de descargas en nuestros servidores. Todo el procesamiento es transitorio.",
          "2. Datos analíticos estándar: Podemos utilizar análisis de terceros para recopilar estadísticas anónimas sobre el uso del sitio web para mejorar la calidad del servicio.",
          "3. Google AdSense: Utilizamos Google AdSense para publicar anuncios. Google utiliza cookies para publicar anuncios basados en las visitas previas del usuario a este sitio web.",
          "4. Contacto: Si tienes alguna pregunta sobre nuestra política de privacidad, contáctanos en support@savetok.co."
        ],
      },
      terms: {
        title: "Términos de Servicio",
        body: [
          "Última actualización: 12 de julio de 2026",
          "Por favor lee estos Términos de Servicio atentamente antes de usar el descargador SaveTok.",
          "1. Aceptación de términos: Al acceder y utilizar nuestro sitio web, aceptas cumplir con todos los términos y condiciones descritos aquí.",
          "2. Uso permitido: SaveTok está diseñado para uso personal y no comercial únicamente. Eres responsable de tener los permisos adecuados para descargar contenido.",
          "3. Propiedad intelectual: SaveTok respeta los derechos de autor. No puedes utilizar esta plataforma para distribuir materiales con derechos de autor sin el consentimiento explícito de los titulares.",
          "4. Limitación de responsabilidad: SaveTok se proporciona 'tal cual' sin garantías de ningún tipo."
        ],
      },
      disclaimer: {
        title: "Descargo de responsabilidad (Disclaimer)",
        body: [
          "Última actualización: 12 de julio de 2026",
          "La información y las descargas proporcionadas en SaveTok son puramente para fines educativos y de utilidad de ayuda.",
          "1. Afiliación: SaveTok es un servicio independiente. NO estamos afiliados, asociados, autorizados ni respaldados oficialmente por TikTok, ByteDance Ltd. ni sus subsidiarias.",
          "2. Propiedad de contenido: Todas las marcas comerciales, logotipos, videos y detalles de creadores que se muestran son propiedad de sus respectivos dueños.",
          "3. Garantías de servicio: No garantizamos operaciones ininterrumpidas o sin errores debido a posibles cambios técnicos de sistemas de terceros."
        ],
      }
    }
  };

  const activeDoc = content[language]?.[type] || content.ID[type];

  return (
    <AnimatePresence>
      <div id="legal-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Semi-transparent dark overlay */}
        <motion.div
          id="legal-backdrop-fade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black"
        />

        {/* Modal Panel container */}
        <motion.div
          id="legal-modal-panel"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 z-10 flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4.5 border-b border-gray-100 shrink-0">
            <h3 className="font-sans font-extrabold text-lg text-[#1A1A1A] tracking-tight">
              {activeDoc.title}
            </h3>
            <button
              id="btn-close-legal"
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none -mr-3"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content body */}
          <div className="p-6 overflow-y-auto space-y-4 font-sans text-sm md:text-base text-gray-600 leading-relaxed">
            {activeDoc.body.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "font-semibold text-gray-500 mb-2.5 text-xs tracking-wider uppercase" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer controls */}
          <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-end bg-[#F9F9F9] rounded-b-2xl">
            <button
              id="btn-confirm-legal"
              onClick={onClose}
              className="px-5 py-2 min-h-[48px] bg-gradient-to-r from-[#FF4B72] to-[#FF7043] hover:opacity-95 text-white font-sans font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Okay
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
