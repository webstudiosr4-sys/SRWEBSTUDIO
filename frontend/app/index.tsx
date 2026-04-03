import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather, AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400;

// Contact Info
const CONTACT = {
  email: 'webstudiosr4@gmail.com',
  facebook: 'https://www.facebook.com/share/1CZRtaAYT3/',
  whatsapp: '+48 452 688 251',
};

// Services Data
const SERVICES = [
  {
    icon: 'globe-outline',
    iconFamily: 'Ionicons',
    title: 'Tworzenie stron WWW',
    description: 'Nowoczesne, szybkie strony zoptymalizowane pod SEO i konwersję klientów',
  },
  {
    icon: 'cart-outline',
    iconFamily: 'Ionicons',
    title: 'Sklepy internetowe (E-commerce)',
    description: 'Sklepy online zaprojektowane tak, aby maksymalizować sprzedaż',
  },
  {
    icon: 'color-palette-outline',
    iconFamily: 'Ionicons',
    title: 'Projektowanie UX/UI',
    description: 'Intuicyjny design, który prowadzi użytkownika do zakupu',
  },
  {
    icon: 'code-slash-outline',
    iconFamily: 'Ionicons',
    title: 'Aplikacje dedykowane',
    description: 'Systemy dopasowane do Twojego biznesu i jego procesów',
  },
  {
    icon: 'search-outline',
    iconFamily: 'Ionicons',
    title: 'SEO i optymalizacja',
    description: 'Zwiększamy widoczność Twojej strony i pozyskujemy ruch z Google',
  },
];

// Portfolio Data
const PORTFOLIO = [
  {
    title: 'Strona dla firmy usługowej',
    description: 'Zwiększenie liczby zapytań o 40% dzięki nowej stronie',
    tag: 'Strona WWW',
    gradient: ['#8b5cf6', '#6366f1'],
  },
  {
    title: 'Sklep e-commerce',
    description: 'Optymalizacja koszyka i wzrost sprzedaży',
    tag: 'E-commerce',
    gradient: ['#ec4899', '#8b5cf6'],
  },
  {
    title: 'Aplikacja webowa',
    description: 'System zarządzania zamówieniami dla biznesu',
    tag: 'Web App',
    gradient: ['#3b82f6', '#06b6d4'],
  },
];

// Process Steps Data
const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Analiza i strategia',
    description: 'Rozumiemy Twój biznes i planujemy rozwiązanie',
  },
  {
    number: '02',
    title: 'Projektowanie UX/UI',
    description: 'Tworzymy nowoczesny i intuicyjny design',
  },
  {
    number: '03',
    title: 'Programowanie',
    description: 'Budujemy szybki i wydajny system',
  },
  {
    number: '04',
    title: 'Wdrożenie',
    description: 'Testujemy i uruchamiamy projekt',
  },
];

// Animated Service Card Component
const ServiceCard = ({ service, index }: { service: typeof SERVICES[0]; index: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.serviceCard, { opacity: fadeAnim, transform: [{ translateY }] }]}>
      <LinearGradient
        colors={['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.05)']}
        style={styles.serviceCardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.serviceIconContainer}>
          <LinearGradient
            colors={['#8b5cf6', '#3b82f6']}
            style={styles.serviceIconGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={service.icon as any} size={24} color="#fff" />
          </LinearGradient>
        </View>
        <Text style={styles.serviceTitle}>{service.title}</Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

// Portfolio Card Component
const PortfolioCard = ({ project, index }: { project: typeof PORTFOLIO[0]; index: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.portfolioCard, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={project.gradient}
        style={styles.portfolioCardHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.portfolioTag}>
          <Text style={styles.portfolioTagText}>{project.tag}</Text>
        </View>
        <Ionicons name="expand-outline" size={24} color="rgba(255,255,255,0.7)" />
      </LinearGradient>
      <View style={styles.portfolioCardContent}>
        <Text style={styles.portfolioTitle}>{project.title}</Text>
        <Text style={styles.portfolioDescription}>{project.description}</Text>
      </View>
    </Animated.View>
  );
};

// Process Step Component
const ProcessStep = ({ step, index, isLast }: { step: typeof PROCESS_STEPS[0]; index: number; isLast: boolean }) => {
  return (
    <View style={styles.processStep}>
      <View style={styles.processStepLeft}>
        <LinearGradient
          colors={['#8b5cf6', '#ec4899']}
          style={styles.processNumber}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.processNumberText}>{step.number}</Text>
        </LinearGradient>
        {!isLast && <View style={styles.processLine} />}
      </View>
      <View style={styles.processStepContent}>
        <Text style={styles.processTitle}>{step.title}</Text>
        <Text style={styles.processDescription}>{step.description}</Text>
      </View>
    </View>
  );
};

export default function Index() {
  const insets = useSafeAreaInsets();
  const heroFadeAnim = useRef(new Animated.Value(0)).current;
  const heroScaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // Refs for scrolling
  const scrollViewRef = useRef<ScrollView>(null);
  const portfolioSectionY = useRef(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(heroScaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const openWhatsApp = () => {
    const phone = CONTACT.whatsapp.replace(/\s/g, '').replace('+', '');
    const url = `https://wa.me/${phone}`;
    Linking.openURL(url);
  };

  const openEmail = () => {
    Linking.openURL(`mailto:${CONTACT.email}`);
  };

  const scrollToPortfolio = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: portfolioSectionY.current,
        animated: true,
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.2)', 'transparent']}
            style={styles.heroGlow}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          
          <Animated.View style={[styles.heroContent, { opacity: heroFadeAnim, transform: [{ scale: heroScaleAnim }] }]}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#8b5cf6', '#ec4899', '#3b82f6']}
                style={styles.logoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.logoText}>SR</Text>
              </LinearGradient>
              <Text style={styles.logoName}>Web Studio</Text>
            </View>

            {/* Headline */}
            <Text style={styles.headline}>
              Strony internetowe, które przyciągają klientów i zwiększają sprzedaż
            </Text>

            {/* Subheadline */}
            <Text style={styles.subheadline}>
              Tworzymy szybkie, nowoczesne strony i sklepy online, które nie tylko wyglądają dobrze, ale realnie zarabiają dla Twojego biznesu
            </Text>

            {/* Small text */}
            <View style={styles.badgeContainer}>
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.3)', 'rgba(59, 130, 246, 0.3)']}
                style={styles.badge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="location-outline" size={14} color="#8b5cf6" />
                <Text style={styles.badgeText}>Dla firm usługowych i lokalnych biznesów w Polsce</Text>
              </LinearGradient>
            </View>

            {/* CTA Buttons */}
            <View style={styles.ctaContainer}>
              <TouchableOpacity onPress={openEmail} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#8b5cf6', '#ec4899']}
                  style={styles.primaryButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.primaryButtonText}>Darmowa analiza</Text>
                  <Ionicons name="arrow-forward" size={18} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} onPress={scrollToPortfolio} activeOpacity={0.7}>
                <Text style={styles.secondaryButtonText}>Zobacz realizacje</Text>
                <Ionicons name="chevron-down" size={18} color="#8b5cf6" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Usługi programistyczne</Text>
            <Text style={styles.sectionSubtitle}>& Web Development</Text>
          </View>

          <View style={styles.servicesGrid}>
            {SERVICES.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </View>
        </View>

        {/* Portfolio Section */}
        <View 
          style={styles.section}
          onLayout={(event) => {
            portfolioSectionY.current = event.nativeEvent.layout.y;
          }}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nasze realizacje</Text>
            <Text style={styles.sectionSubtitleSmall}>Projekty, które przynoszą realne wyniki</Text>
          </View>

          <View style={styles.portfolioGrid}>
            {PORTFOLIO.map((project, index) => (
              <PortfolioCard key={index} project={project} index={index} />
            ))}
          </View>

          <TouchableOpacity style={styles.viewAllButton} onPress={scrollToPortfolio} activeOpacity={0.7}>
            <Text style={styles.viewAllButtonText}>Zobacz wszystkie projekty</Text>
            <Ionicons name="arrow-forward" size={16} color="#8b5cf6" />
          </TouchableOpacity>
        </View>

        {/* Process Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jak wygląda współpraca</Text>
            <Text style={styles.sectionSubtitleSmall}>Proces tworzenia Twojego projektu</Text>
          </View>

          <View style={styles.processContainer}>
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep 
                key={index} 
                step={step} 
                index={index} 
                isLast={index === PROCESS_STEPS.length - 1} 
              />
            ))}
          </View>
        </View>

        {/* Final CTA Section */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.15)', 'rgba(236, 72, 153, 0.1)']}
            style={styles.ctaSectionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaSectionTitle}>Zbuduj stronę, która zacznie zarabiać</Text>
            <Text style={styles.ctaSectionText}>
              Otrzymaj darmową analizę i dowiedz się, jak możemy zwiększyć liczbę klientów w Twoim biznesie
            </Text>

            <TouchableOpacity onPress={openWhatsApp} activeOpacity={0.8}>
              <LinearGradient
                colors={['#25D366', '#128C7E']}
                style={styles.primaryButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                <Text style={styles.primaryButtonText}>Darmowa analiza</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Secondary Contact Option */}
            <TouchableOpacity style={styles.secondaryContactButton} onPress={openEmail} activeOpacity={0.7}>
              <Ionicons name="mail-outline" size={18} color="#8b5cf6" />
              <Text style={styles.secondaryContactText}>lub napisz email</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
          {/* Logo */}
          <View style={styles.footerLogo}>
            <LinearGradient
              colors={['#8b5cf6', '#ec4899', '#3b82f6']}
              style={styles.footerLogoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.footerLogoText}>SR</Text>
            </LinearGradient>
            <Text style={styles.footerLogoName}>Web Studio</Text>
          </View>

          {/* Footer Menu */}
          <View style={styles.footerMenu}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Realizacje</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Usługi</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>O nas</Text>
            </TouchableOpacity>
          </View>

          {/* Social Links */}
          <View style={styles.socialLinks}>
            <TouchableOpacity 
              style={styles.socialIcon} 
              onPress={() => openLink(CONTACT.facebook)}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-facebook" size={22} color="#a1a1aa" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialIcon} 
              onPress={openWhatsApp}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-whatsapp" size={22} color="#a1a1aa" />
            </TouchableOpacity>
          </View>

          {/* Copyright */}
          <Text style={styles.copyright}>
            © 2025 SR Web Studio. Wszystkie prawa zastrzeżone.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Hero Section
  heroSection: {
    minHeight: 600,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  heroContent: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoGradient: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  logoName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  headline: {
    fontSize: isSmallScreen ? 28 : 36,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    lineHeight: isSmallScreen ? 36 : 46,
    marginBottom: 20,
  },
  subheadline: {
    fontSize: 16,
    color: '#a1a1aa',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  badgeContainer: {
    marginBottom: 32,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  badgeText: {
    color: '#d4d4d8',
    fontSize: 14,
    marginLeft: 6,
  },
  ctaContainer: {
    alignItems: 'center',
    gap: 16,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#8b5cf6',
    fontSize: 15,
    fontWeight: '600',
  },

  // Section Styles
  section: {
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#8b5cf6',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionSubtitleSmall: {
    fontSize: 16,
    color: '#71717a',
    textAlign: 'center',
    marginTop: 8,
  },

  // Services Grid
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  serviceCardGradient: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  serviceIconContainer: {
    marginBottom: 16,
  },
  serviceIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#a1a1aa',
    lineHeight: 22,
  },

  // Portfolio Grid
  portfolioGrid: {
    gap: 20,
  },
  portfolioCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  portfolioCardHeader: {
    height: 140,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  portfolioTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  portfolioTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  portfolioCardContent: {
    padding: 20,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  portfolioDescription: {
    fontSize: 14,
    color: '#a1a1aa',
    lineHeight: 22,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 8,
  },
  viewAllButtonText: {
    color: '#8b5cf6',
    fontSize: 15,
    fontWeight: '600',
  },

  // Process Section
  processContainer: {
    paddingLeft: 8,
  },
  processStep: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  processStepLeft: {
    alignItems: 'center',
    marginRight: 20,
  },
  processNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  processLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    marginTop: 8,
    marginBottom: 8,
    minHeight: 40,
  },
  processStepContent: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 32,
  },
  processTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  processDescription: {
    fontSize: 14,
    color: '#a1a1aa',
    lineHeight: 22,
  },

  // CTA Section
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  ctaSectionGradient: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  ctaSectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSectionText: {
    fontSize: 16,
    color: '#a1a1aa',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
  },
  contactOptions: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
  },
  contactOptionText: {
    color: '#d4d4d8',
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
    paddingVertical: 8,
  },
  secondaryContactText: {
    color: '#8b5cf6',
    fontSize: 14,
    fontWeight: '500',
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  footerLogoGradient: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  footerLogoText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  footerLogoName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  footerMenu: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerLink: {
    color: '#a1a1aa',
    fontSize: 14,
    fontWeight: '500',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  copyright: {
    color: '#52525b',
    fontSize: 13,
    textAlign: 'center',
  },
});
