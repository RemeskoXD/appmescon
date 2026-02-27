import SectionContainer from '../ui/SectionContainer';

const trustedCompanies = [
  { name: 'Microsoft', logo: 'MS' },
  { name: 'Google', logo: 'GL' },
  { name: 'Amazon AWS', logo: 'AWS' },
  { name: 'Meta', logo: 'META' },
  { name: 'Apple', logo: 'APPLE' },
  { name: 'Adobe', logo: 'ADOBE' },
  { name: 'Salesforce', logo: 'SF' },
  { name: 'Oracle', logo: 'ORC' }
];

export default function TrustLogos() {
  return (
    <SectionContainer className="py-12 md:py-16" background="dark">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Důvěřují nám přední společnosti
        </h2>
        <p className="text-slate-400">
          Propojujeme technologie světových lídrů pro váš úspěch
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
        {trustedCompanies.map((company, index) => (
          <div
            key={company.name}
            className="group flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 hover:bg-slate-800/30 hover:-translate-y-1"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <div className="text-4xl md:text-5xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter grayscale group-hover:grayscale-0">
              {company.logo}
            </div>
            <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors duration-300 font-medium">
              {company.name}
            </span>
          </div>
        ))}
      </div>

      {/* Animated background elements */}
      <div className="relative mt-8 overflow-hidden">
        <div className="flex space-x-8 animate-marquee">
          {trustedCompanies.concat(trustedCompanies).map((company, index) => (
            <div
              key={`marquee-${index}`}
              className="flex-shrink-0 text-2xl opacity-10"
            >
              {company.logo}
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}