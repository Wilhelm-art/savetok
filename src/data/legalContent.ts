import { Language } from "../types";

export type LegalDocType = "privacy" | "terms" | "disclaimer";

export interface LegalDocument {
  title: string;
  body: string[];
}

export const legalContent: Record<Language, Record<LegalDocType, LegalDocument>> = {
  ID: {
    privacy: {
      title: "Kebijakan Privasi",
      body: [
        "Terakhir Diperbarui: 12 Juli 2026",
        "Di SaveTok, kami memprioritaskan privasi Anda. Kebijakan Privasi ini menguraikan jenis informasi yang kami kumpulkan dan bagaimana kami menggunakannya.",
        "1. Pengumpulan Informasi: SaveTok adalah layanan gratis dan sepenuhnya stateless. Kami tidak menyimpan, mengunggah, atau menyimpan tautan video, data pengunduh, atau riwayat unduhan apa pun di server kami. Semua analisis tautan dilakukan secara langsung (real-time) dan bersifat sementara.",
        "2. Data Analitik Standar: Kami mungkin menggunakan layanan analitik pihak ketiga standar (seperti Google Analytics) untuk mengumpulkan data statistik anonim tentang penggunaan situs untuk meningkatkan kualitas layanan. Ini termasuk informasi dasar seperti browser yang digunakan, waktu kunjungan, dan halaman yang dikunjungi.",
        "3. Google AdSense: Kami menggunakan Google AdSense untuk menayangkan iklan. Google menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan pengguna sebelumnya ke situs ini atau situs lainnya.",
        "4. Kontak Kami: Jika Anda memiliki pertanyaan atau masukan tentang kebijakan privasi kami, silakan hubungi tim kami di support@savetok.web.id."
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
        "4. Contact Us: If you have questions or feedback regarding our privacy policy, please contact our team at support@savetok.web.id."
      ],
    },
    terms: {
      title: "Terms of Service",
      body: [
        "Last Updated: July 12, 2026",
        "Please read these Terms of Service before using the SaveTok video downloader platform.",
        "1. Acceptance of Terms: By accessing and using our service, you agree to comply with all terms and conditions outlined here.",
        "2. Permitted Use: SaveTok is intended solely for personal, non-commercial use. You are solely responsible for ensuring you have valid authorization to download and retain content from original creators.",
        "3. Intellectual Property Rights: SaveTok respects creator rights. You must not use our tool to download copyrighted media without appropriate explicit permissions.",
        "4. Disclaimer of Warranties: SaveTok is provided on an 'as-is' basis without warranties. We are not liable for any issues arising from the use or inability to use our tools."
      ],
    },
    disclaimer: {
      title: "Disclaimer",
      body: [
        "Last Updated: July 12, 2026",
        "The media conversion and download services on SaveTok are provided purely as an assisting utility.",
        "1. Non-Affiliation: SaveTok is an independent, free utility. We are NOT affiliated, endorsed, sponsored, or associated in any official manner with TikTok or ByteDance Ltd.",
        "2. Content Ownership: All trademarks, names, media, and logos belong to their respective copyright holders. Users should download media only for educational or personal archival reasons.",
        "3. Service Continuity: While we strive for seamless operation, we cannot guarantee uninterrupted service due to potential external infrastructure and policy changes by third-party platforms."
      ],
    }
  }
};
