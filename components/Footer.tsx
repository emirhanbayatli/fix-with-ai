import { Globe, Mail, Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] py-16 px-6 border-t border-[#c3c6d7]/30">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="w-7 h-7 text-[#004ac6]" />
              <span className="text-[24px] font-bold text-[#004ac6]">
                Fix with AI
              </span>
            </div>
            <p className="text-[#434655] max-w-sm mb-6">
              Geleceğin tamir asistanı ile tanışın. Yapay zeka eşyalarınızı
              değil, tamir etme yeteneğinizi geliştirir.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-[#e7e8e9] flex items-center justify-center hover:bg-[#004ac6] hover:text-white transition-colors"
                href="#"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                className="w-10 h-10 rounded-full bg-[#e7e8e9] flex items-center justify-center hover:bg-[#004ac6] hover:text-white transition-colors"
                href="#"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Kurumsal</h4>
            <ul className="space-y-4 text-[#434655]">
              <li>
                <a className="hover:text-[#004ac6] transition-colors" href="#">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a className="hover:text-[#004ac6] transition-colors" href="#">
                  Kariyer
                </a>
              </li>
              <li>
                <a className="hover:text-[#004ac6] transition-colors" href="#">
                  İletişim
                </a>
              </li>
              <li>
                <a className="hover:text-[#004ac6] transition-colors" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Yasal</h4>
            <ul className="space-y-4 text-[#434655]">
              <li>
                <a className="hover:text-[#004ac6] transition-colors" href="#">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a className="hover:text-[#004ac6] transition-colors" href="#">
                  Kullanım Şartları
                </a>
              </li>
              <li>
                <a className="hover:text-[#004ac6] transition-colors" href="#">
                  Çerez Ayarları
                </a>
              </li>
              <li>
                <a className="hover:text-[#004ac6] transition-colors" href="#">
                  Güvenlik
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#c3c6d7]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#434655]">
          <p>© {new Date().getFullYear()} Fix with AI. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
