"use client";
import { CategoryCard } from "@/components/CategoryCard";
import { StepCard } from "@/components/StepCard";
import { useAuth } from "@/features/auth/AuthProvider";
import {
  MoveRight,
  Sparkles,
  Camera,
  Brain,
  CheckSquare,
  ScanFace,
  ShieldAlert,
  History,
  Zap,
  Check,
  Smartphone,
  Droplet,
  Bike,
  Tv,
  Armchair,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".staircase-animation");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] font-sans selection:bg-[#dbe1ff] selection:text-[#00174b]">
      <main className="pt-12">
        <section className="staircase-animation relative overflow-hidden px-6 py-16 md:py-32 flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dbe1ff] text-[#00174b] text-[12px] font-semibold leading-none">
              <Sparkles className="w-4 h-4 text-[#004ac6]" />
              Yapay Zeka Destekli Tamir Devrimi
            </div>

            <h1 className="text-[48px] md:text-6xl font-bold text-[#191c1d] leading-tight tracking-tight">
              Bozuk Eşyalarınızı{" "}
              <span className="text-[#004ac6] italic">Yapay Zeka</span> ile
              Tamir Edin
            </h1>

            <p className="text-[18px] leading-relaxed text-[#434655] max-w-2xl mx-auto">
              Fotoğraf yükleyin, yapay zeka sorunu analiz etsin ve size adım
              adım tamir rehberi sunsun. Karmaşık tamir işlerini herkes için
              kolaylaştırıyoruz.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={user ? "/analyze" : "/login"}
                className="bg-[#004ac6] text-white px-8 py-4 rounded-2xl text-[24px] font-semibold shadow-[0_0_20px_rgba(0,74,198,0.2)] hover:shadow-[0_0_30px_rgba(0,74,198,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Hemen Başla
                <MoveRight />
              </Link>
              <Link
                href="#how-it-works"
                className="bg-white text-[#191c1d] border border-[#c3c6d7] px-8 py-4 rounded-2xl text-[24px] font-semibold hover:bg-[#f3f4f5] transition-colors"
              >
                Nasıl Çalışır?
              </Link>
            </div>
          </div>
        </section>

        <section
          className="staircase-animation py-24 px-6 bg-[#f3f4f5]"
          id="how-it-works"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[32px] md:text-5xl font-semibold mb-4">
                Nasıl Çalışır?
              </h2>
              <p className="text-[#434655] text-[16px]">
                Sadece 3 adımda cihazınızı hayata döndürün
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#c3c6d7] -translate-y-1/2 z-0"></div>
              <StepCard
                number={1}
                icon={Camera}
                title={"Fotoğraf Yükle"}
                description={
                  "Arızalı cihazın net bir fotoğrafını çekin veya yükleyin."
                }
              />
              <StepCard
                number={2}
                icon={Brain}
                title={"Yapay Zeka Analizi"}
                description={
                  "Gelişmiş algoritmalarımız sorunu anında tespit etsin."
                }
              />
              <StepCard
                number={3}
                icon={CheckSquare}
                title={"Tamir Rehberi"}
                description={
                  "Kişiselleştirilmiş, adım adım talimatlarla tamiri tamamlayın."
                }
              />
            </div>
          </div>
        </section>

        <section className="staircase-animation py-24 px-6">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 p-8 bg-[#004ac6] rounded-3xl text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <ScanFace className="w-10 h-10 mb-4" />
                  <h3 className="text-3xl font-bold mb-4">
                    AI Görüntü Analizi
                  </h3>
                  <p className="text-[#eeefff]/80 text-lg max-w-md">
                    En karmaşık donanım sorunlarını bile sadece bir fotoğrafla
                    saniyeler içinde teşhis ediyoruz.
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 p-8 bg-white/80 backdrop-blur-xl border border-[#c3c6d7]/30 rounded-3xl">
                <ShieldAlert className="text-[#004ac6] w-10 h-10 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Güvenlik Önerileri</h3>
                <p className="text-[#434655]">
                  Tamir sırasında almanız gereken önlemleri ve gerekli koruyucu
                  ekipmanları hatırlatırız.
                </p>
              </div>

              <div className="md:col-span-4 p-8 bg-white/80 backdrop-blur-xl border border-[#c3c6d7]/30 rounded-3xl">
                <History className="text-[#004ac6] w-10 h-10 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Tamir Geçmişi</h3>
                <p className="text-[#434655]">
                  Tüm tamirlerinizi dijital olarak saklayın, yedek parçalarınızı
                  takip edin.
                </p>
              </div>

              <div className="md:col-span-8 p-8 bg-[#e1e3e4] rounded-3xl relative overflow-hidden group">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <Zap className="text-[#004ac6] w-10 h-10 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Hızlı Sonuçlar</h3>
                    <p className="text-[#434655]">
                      Vakit nakittir. Yapay zekamız, profesyonel bir teknisyenin
                      saatlerce süren analizini milisaniyelere indirir.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
                    <Zap className="text-[#004ac6] w-12 h-12 animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="staircase-animation py-24 px-6 bg-[#f3f4f5]">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-[32px] font-semibold text-center mb-16">
              Neleri Tamir Edebilirsiniz?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { icon: Smartphone, label: "Telefonlar" },
                { icon: Droplet, label: "Su Tesisatı" },
                { icon: Bike, label: "Bisikletler" },
                { icon: Tv, label: "Küçük Ev Aletleri" },
                { icon: Armchair, label: "Mobilyalar" },
                { icon: Cpu, label: "Elektronik" },
              ].map((item, index) => {
                return (
                  <CategoryCard
                    key={index}
                    icon={item.icon}
                    label={item.label}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="staircase-animation py-24 px-6">
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-[32px] md:text-5xl font-semibold">
                Neden Fix with AI?
              </h2>
              <p className="text-[#434655] text-lg">
                Sadece bir tamir aracı değil, aynı zamanda çevreci ve ekonomik
                bir yaşam tarzı sunuyoruz.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Para Tasarrufu",
                    desc: "Pahalı teknik servislere ödeme yapmak yerine sorunu kendiniz çözün.",
                  },
                  {
                    title: "Yeni Beceriler Öğrenin",
                    desc: "Her tamir, bir sonraki sorun için size deneyim kazandırır.",
                  },
                  {
                    title: "Doğa Dostu",
                    desc: "Eşyalarınızı çöpe atmak yerine tamir ederek karbon ayak izinizi azaltın.",
                  },
                ].map((reason, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-[#6ffbbe] flex items-center justify-center">
                      <Check className="text-[#002113] w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold">{reason.title}</h4>
                      <p className="text-[#434655]">{reason.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  alt="Workshop repair space"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYWCGzorLwa8m8VYQknPFGBr5YkYge5hdnOxL7CjJbj6tlu_atUatkTwJ0pQIFO0n6E3mhgLi7OLQ0MsoDkY87tePu8SktIoEkzNd49FQThGBhfWBYlCVkcDWcz2GlaH1IBiMz-LDUtYUym485GzHwOTmjtSvBCFnrFGS_IhIVJESax9QxVncHy0qaJqDoOtOz7kNQvVyzZF01wUC6Gg06iXU04DE2netwCI3hfpN2L0rYGPTK-1-VoJ5TQWQWwFzghIJBvY_tw_t4"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="staircase-animation py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto p-12 md:p-20 bg-[#2563eb] rounded-[40px] text-[#eeefff] relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h2 className="text-[48px] font-bold leading-tight">
                Tamire Başlamaya Hazır mısınız?
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Bir hesap oluşturun ve yapay zekanın gücüyle bozuk eşyalarınızı
                yeniden hayata döndürün. Üstelik ilk 3 analiz tamamen ücretsiz!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href={user ? "/analyze" : "/login"}
                  className="bg-white text-[#004ac6] px-10 py-5 rounded-2xl text-[24px] font-semibold shadow-xl hover:scale-105 transition-transform"
                >
                  Hemen Ücretsiz Başla
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
