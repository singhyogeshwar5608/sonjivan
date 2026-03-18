import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import { 
  Target, 
  Eye, 
  Heart, 
  CheckCircle, 
  Wrench, 
  Clock, 
  Users, 
  Cog, 
  Home,
  Award,
  Star,
  Shield,
  Zap,
  TrendingUp,
  Globe,
  Phone
} from 'lucide-react';
import aboutBanner from '../assets/images/banner/sonjivan banner6.jpeg';
import storyImage from '../assets/images/banner/sonjivan banner3.png';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <div>
      {/* Hero Section with Your Banner */}
      <section 
        className="relative w-full h-auto"
      >
        <img 
          src={aboutBanner} 
          alt="" 
          className="w-full h-auto object-contain"
        />
      </section>

      {/* Mission & Vision Cards - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.ourFoundation.split(' ')[0]} <span className="text-primary">{t.ourFoundation.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.foundationSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-primary">
              <div className="absolute -top-6 left-8">
                <div className="bg-gradient-to-r from-primary to-blue-600 p-4 rounded-full shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.ourMission}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.missionDesc}
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Learn More</span>
                  <Zap className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-yellow-400">
              <div className="absolute -top-6 left-8">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.ourVision}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.visionDesc}
                </p>
                <div className="flex items-center text-yellow-600 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Explore Vision</span>
                  <TrendingUp className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            {/* Values Card */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-red-400">
              <div className="absolute -top-6 left-8">
                <div className="bg-gradient-to-r from-red-400 to-pink-500 p-4 rounded-full shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.ourCoreValues}</h3>
                <div className="text-gray-600 leading-relaxed mb-6 space-y-2">
                  <p className="font-semibold">• {t.qualityValue}:</p>
                  <p className="text-sm mb-3">{t.qualityDesc}</p>
                  <p className="font-semibold">• {t.integrityValue}:</p>
                  <p className="text-sm mb-3">{t.integrityDesc}</p>
                  <p className="font-semibold">• {t.innovationValue}:</p>
                  <p className="text-sm mb-3">{t.innovationDesc}</p>
                  <p className="font-semibold">• {t.serviceValue}:</p>
                  <p className="text-sm">{t.serviceDesc}</p>
                </div>
                <div className="flex items-center text-red-500 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>{t.ourValues}</span>
                  <Heart className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Redesigned */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t.ourJourney}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.ourStory.split(' ')[0]} <span className="text-primary">{t.ourStory.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.storySubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Story Content */}
            <div className="space-y-8">
              {/* Story Introduction - Horizontal Layout */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {t.aboutCompany}
                </h3>
                
                {/* Horizontal Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {t.aboutCompanyDesc1}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {t.aboutCompanyDesc2}
                    </p>
                  </div>
                  
                  {/* Column 2 */}
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {t.aboutCompanyDesc3}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {t.aboutCompanyDesc4}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-primary">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3">
                      <Home className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{t.foundation}</h4>
                      <p className="text-sm text-primary font-semibold">{t.sirsa}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t.foundationDesc}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-500">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Wrench className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{t.qualityProductsTitle}</h4>
                      <p className="text-sm text-green-600 font-semibold">{t.excellence}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t.qualityProductsDesc}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-yellow-500">
                  <div className="flex items-center mb-3">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                      <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{t.expertTeam}</h4>
                      <p className="text-sm text-yellow-600 font-semibold">{t.skilled}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t.expertTeamDesc}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-purple-500">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{t.customerTrust}</h4>
                      <p className="text-sm text-purple-600 font-semibold">{t.growing}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t.customerTrustDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  className="w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-700" 
                  src={storyImage} 
                  alt="JB Aluminum Industries - Our Story and Journey" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">100+</p>
                    <p className="text-sm text-gray-600">{t.projectsCompletedStat}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">100%</p>
                    <p className="text-sm text-gray-600">{t.qualityAssuredStat}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto border border-blue-100">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-blue-600 rounded-full text-white font-semibold mb-6">
                <Eye className="w-4 h-4 mr-2" />
                {t.lookingForward}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t.buildingBetterSpaces}
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {t.lookingForwardDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center justify-center px-6 py-3 bg-primary/10 rounded-full text-primary font-semibold">
                  <Globe className="w-5 h-5 mr-2" />
                  {t.qualityProducts}
                </div>
                <div className="flex items-center justify-center px-6 py-3 bg-green-100 rounded-full text-green-700 font-semibold">
                  <Zap className="w-5 h-5 mr-2" />
                  {t.expertService}
                </div>
                <div className="flex items-center justify-center px-6 py-3 bg-yellow-100 rounded-full text-yellow-700 font-semibold">
                  <Heart className="w-5 h-5 mr-2" />
                  {t.customerCare}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4">
              <Shield className="w-4 h-4 mr-2" />
              {t.whyChooseUsTitle}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.excellenceInProject.split(' ').slice(0, 3).join(' ')} <span className="text-primary">{t.excellenceInProject.split(' ').slice(3).join(' ')}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.whyChooseDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-primary/5 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100">
              <div className="bg-gradient-to-r from-primary to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.premiumQualityMaterials}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.premiumQualityDesc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.expertCraftsmanship}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.expertCraftsmanshipDesc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-100">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.timelyCompletion}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.timelyCompletionDesc}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.professionalTeam}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.professionalTeamDesc}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-indigo-100">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cog className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.modernTools}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.modernToolsDesc}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-teal-100">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t.customSolutions}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.customSolutionsDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Bar */}
      <section className="py-20 bg-gradient-to-r from-primary via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-400/20 rounded-full blur-lg"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.trustedByCustomers}
            </h2>
            <p className="text-blue-100 text-lg">
              {t.commitmentToQuality}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-6xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform">100+</div>
                <div className="text-white/90 font-semibold text-lg">{t.projects}</div>
                <div className="text-blue-200 text-sm">{t.completed}</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-6xl font-black text-green-400 mb-2 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-white/90 font-semibold text-lg">{t.quality}</div>
                <div className="text-blue-200 text-sm">{t.assured}</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-6xl font-black text-pink-400 mb-2 group-hover:scale-110 transition-transform">15+</div>
                <div className="text-white/90 font-semibold text-lg">{t.locations}</div>
                <div className="text-blue-200 text-sm">{t.acrossRegion}</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-6xl font-black text-orange-400 mb-2 group-hover:scale-110 transition-transform">100+</div>
                <div className="text-white/90 font-semibold text-lg">{t.experts}</div>
                <div className="text-blue-200 text-sm">{t.medicalTeam}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-purple-600/20"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 backdrop-blur-sm rounded-full text-yellow-400 font-semibold mb-6">
            <Phone className="w-4 h-4 mr-2" />
            {t.readyToGetStarted}
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t.qualityAluminumPriority.split(' ').slice(0, 3).join(' ')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> {t.qualityAluminumPriority.split(' ').slice(3).join(' ')}</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            {t.ctaDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/contact" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl inline-block text-center"
            >
              {t.getAQuoteNow}
            </Link>
            <Link 
              to="/products" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 inline-block text-center"
            >
              {t.viewOurServices}
            </Link>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-primary" />
              <span>+91-94614-94614</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary" />
              <span>15+ {t.locations}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              <span>{t.support247}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
