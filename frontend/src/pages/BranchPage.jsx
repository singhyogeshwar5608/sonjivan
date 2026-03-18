import { MapPin, Phone, Clock } from 'lucide-react';

const BranchPage = ({ title, address, phones = [], hours }) => {
  const phoneNumbers = Array.isArray(phones)
    ? phones
    : typeof phones === 'string'
      ? phones.split('|').map(p => p.trim()).filter(Boolean)
      : [];

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className="py-8">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
          <p className="text-blue-100 max-w-2xl">
            Visit our {title} for quality aluminum products and services with experienced staff and modern facilities.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom grid lg:grid-cols-2 gap-10">
          {/* Details */}
          <div>
            <div className="card p-6 md:p-8 space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">Address</h2>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">{address}</p>
                </div>
              </div>

              {phoneNumbers.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="bg-green-50 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Contact Numbers</h2>
                    <div className="space-y-1">
                      {phoneNumbers.map((ph, idx) => (
                        <p key={idx} className="text-gray-700 text-sm md:text-base">
                          <a
                            href={`tel:${ph.replace(/[- ]/g, '')}`}
                            className="text-primary hover:text-blue-700 font-medium"
                          >
                            {ph}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {hours && (
                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Timings</h2>
                    <p className="text-gray-700 text-sm md:text-base whitespace-pre-line">{hours}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg min-h-[260px]">
            <iframe
              title={`${title} Location Map`}
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ minHeight: '260px', border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export const MohaliCorporateBranch = () => (
  <BranchPage
    title="Corporate Office - Mohali"
    address="SCO-10, Block-F, Aero City, Airport Road, SAS Nagar, Mohali, Punjab"
    phones={["0172-23581102", "8222-000-374", "99921-06363"]}
    hours={"Monday - Saturday: 8:00 AM - 8:00 PM\nSunday: 9:00 AM - 2:00 PM"}
  />
);

export const PanipatRegionalLabBranch = () => (
  <BranchPage
    title="Regional Lab - Panipat"
    address="Shop # 47, 1st Floor, Main Market, Sector 18, Panipat - 132103 (Haryana)"
    phones={["96717-06363", "96712-06363"]}
    hours={"Monday - Saturday: 8:00 AM - 8:00 PM\nSunday: 9:00 AM - 2:00 PM"}
  />
);

export const JalandharRegionalLabBranch = () => (
  <BranchPage
    title="Regional Lab - Jalandhar"
    address="SCF 10, BSF Colony, Near HMV College, Jalandhar City - 144008 (Punjab)"
    phones={[]}
    hours={"Monday - Saturday: 8:00 AM - 8:00 PM\nSunday: 9:00 AM - 2:00 PM"}
  />
);

export const MohaliReferenceLabBranch = () => (
  <BranchPage
    title="Reference Lab - Mohali"
    address="SCO-10, Block-F, Aero City, Airport Road, SAS Nagar, Mohali, Punjab"
    phones={["0172-23581102", "8222-000-374", "99921-06363"]}
    hours={"Monday - Saturday: 8:00 AM - 8:00 PM\nSunday: 9:00 AM - 2:00 PM"}
  />
);

export const JhajjarReferenceLabBranch = () => (
  <BranchPage
    title="Reference Lab - Jhajjar"
    address="Near Ayush Ayurvedic Hospital, Bhuddo Mata Mandir, Jai Hind Colony, Ward No. 4, Jhajjar (Haryana)"
    phones={["+91-93064-79957"]}
    hours={"Monday - Saturday: 8:00 AM - 8:00 PM\nSunday: 9:00 AM - 2:00 PM"}
  />
);

export const PanipatCorporateOfficeBranch = () => (
  <BranchPage
    title="Corporate Office - Panipat"
    address="Shop # 47, 2nd Floor, Main Market, Sector 18, Panipat - 132103 (Haryana)"
    phones={["96717-06363", "96712-06363"]}
    hours={"Monday - Saturday: 8:00 AM - 8:00 PM\nSunday: 9:00 AM - 2:00 PM"}
  />
);

export default BranchPage;
