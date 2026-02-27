import { 
  ArrowRight,
  ShoppingCart,
  Code,
  Megaphone,
  Server
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import SectionContainer from '../ui/SectionContainer';

const serviceCategories = [
  {
    category: "Web a aplikace",
    icon: Code,
    services: [
      {
        title: 'Webové stránky',
        description: 'Firemní weby, které budují důvěru a přinášejí poptávky',
        price: 'Od 15 000 Kč',
        features: ['Jasná struktura pro rychlé rozhodování', 'SEO základ pro organickou poptávku', 'Správa obsahu bez závislosti na vývoji', 'Rychlé načítání i na mobilu']
      },
      {
        title: 'Webové aplikace',
        description: 'Aplikace pro interní procesy a klientské portály',
        price: 'Od 35 000 Kč',
        features: ['Zrychlení interních procesů', 'Integrace na stávající systémy', 'Bezpečný přístup a role', 'Škálovatelný provoz']
      }
    ]
  },
  {
    category: "E-commerce",
    icon: ShoppingCart,
    services: [
      {
        title: 'Online obchody',
        description: 'E-shopy napojené na sklad, fakturaci a marketing',
        price: 'Od 25 000 Kč',
        features: ['Stabilní provoz i ve špičkách', 'Méně ruční práce v expedici', 'Měřitelné konverze a marže', 'Integrace plateb a dopravy']
      },
      {
        title: 'Marketplace',
        description: 'Platformy pro více prodejců s jasnými pravidly',
        price: 'Od 75 000 Kč',
        features: ['Automatizované provizní toky', 'Kontrola nabídky a kvality', 'Reporting pro partnery', 'Škálování katalogu']
      }
    ]
  },
  {
    category: "Hosting a infrastruktura",
    icon: Server,
    services: [
      {
        title: 'Webhosting Premium',
        description: 'Provoz webů a aplikací se SLA a dohledem',
        price: 'Od 299 Kč/měs',
        features: ['Stabilní dostupnost', 'Bezpečnostní monitoring', 'Denní zálohy', 'Rychlá reakce podpory']
      },
      {
        title: 'Cloud řešení',
        description: 'Infrastruktura, která roste s byznysem',
        price: 'Od 999 Kč/měs',
        features: ['Kapacita podle potřeby', 'Vyrovnávání zátěže', 'Distribuce obsahu', 'Monitoring výkonu']
      }
    ]
  },
  {
    category: "Marketing a SEO",
    icon: Megaphone,
    services: [
      {
        title: 'Digitální marketing',
        description: 'Výkonové kampaně s jasnou návratností',
        price: 'Od 8 999 Kč/měs',
        features: ['Transparentní rozpočty', 'Přehledné reporty', 'Kontrola nad poptávkami', 'Průběžná optimalizace']
      },
      {
        title: 'SEO optimalizace',
        description: 'Dlouhodobá organická poptávka',
        price: 'Od 4 999 Kč/měs',
        features: ['Obsah a struktura webu', 'Technické SEO', 'Kvalitní odkazy', 'Měřitelné výsledky']
      }
    ]
  }
];

export default function ServiceCards() {
  return (
    <SectionContainer id="services-detail" className="py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Naše <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#799dfb] to-cyan-400">služby</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto px-4">
          Služby stavíme jako provozní celek s jasnou odpovědností
        </p>
      </div>

      {/* Service categories */}
      <div className="space-y-12 sm:space-y-16">
        {serviceCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div key={category.category} className="relative">
              {/* Category header */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-[#5885fa]/10 to-cyan-500/10 rounded-full border border-[#5885fa]/20">
                  <IconComponent className="w-6 h-6 text-[#799dfb]" />
                  <h3 className="text-xl font-bold text-white">{category.category}</h3>
                </div>
              </div>

              {/* Services in this category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {category.services.map((service) => (
                  <Card 
                    key={service.title} 
                    hover 
                    glow 
                    className="p-6 h-full"
                  >
                    <div className="space-y-4 h-full flex flex-col">
                      <h4 className="text-xl font-bold text-white">
                        {service.title}
                      </h4>
                      
                      <p className="text-slate-400 flex-grow leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="text-lg font-bold text-cyan-400">
                          {service.price}
                        </div>
                        
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="text-sm text-slate-300 flex items-center">
                              <span className="w-1.5 h-1.5 bg-[#799dfb] rounded-full mr-3 flex-shrink-0"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full group"
                        >
                          Zjistit více
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* CTA sekce */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-[#5885fa]/10 to-cyan-500/10 rounded-2xl p-8 border border-[#5885fa]/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            Jedna odpovědnost místo více dodavatelů
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Můžete začít jednou oblastí a postupně přidávat další. Držíme technický provoz i výstupy v jednom týmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="md">
              Domluvit konzultaci
            </Button>
            <Button variant="outline" size="md">
              Sestavit řešení
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
