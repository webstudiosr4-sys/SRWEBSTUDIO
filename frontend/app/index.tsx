import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 500;
const isWeb = Platform.OS === 'web';

// ── Contact Info ──
const CONTACT = {
  telegram: '@srwebstudio',
  telegramUrl: 'https://t.me/srwebstudio',
  email: 'webstudiosr4@gmail.com',
};

// ── Services Data ──
const SERVICES = [
  {
    icon: 'rocket-outline' as const,
    title: 'Landing Pages',
    desc: 'Perfect for ads and quick sales',
    color: '#6366f1',
  },
  {
    icon: 'briefcase-outline' as const,
    title: 'Business Websites',
    desc: 'Professional sites for your company',
    color: '#8b5cf6',
  },
  {
    icon: 'cart-outline' as const,
    title: 'Online Stores',
    desc: 'Sell your products easily',
    color: '#a855f7',
  },
];

// ── Why Choose Me ──
const ADVANTAGES = [
  { icon: 'flash-outline' as const, title: 'Fast delivery', desc: '2–3 days turnaround' },
  { icon: 'wallet-outline' as const, title: 'Affordable prices', desc: 'Starting from $100' },
  { icon: 'color-palette-outline' as const, title: 'Modern design', desc: 'Clean & professional' },
  { icon: 'phone-portrait-outline' as const, title: 'Mobile optimized', desc: 'Looks great everywhere' },
  { icon: 'person-outline' as const, title: 'Personal approach', desc: 'Direct communication' },
];

// ── Portfolio Data ──
const PORTFOLIO = [
  {
    title: 'Fitness Coach Landing',
    desc: 'High-converting landing page for a personal trainer',
    tag: 'Landing Page',
    colors: ['#6366f1', '#8b5cf6'] as [string, string],
    icon: 'fitness-outline' as const,
  },
  {
    title: 'Restaurant Website',
    desc: 'Elegant multi-page site for a local café',
    tag: 'Business Site',
    colors: ['#ec4899', '#f472b6'] as [string, string],
    icon: 'restaurant-outline' as const,
  },
  {
    title: 'Fashion Store',
    desc: 'Modern e-commerce with product catalog',
    tag: 'Online Store',
    colors: ['#8b5cf6', '#a855f7'] as [string, string],
    icon: 'bag-outline' as const,
  },
];

// ── Pricing Data ──
const PRICING = [
  {
    name: 'Basic',
    price: '$100',
    features: ['1 page website', 'Clean design', 'Mobile version', 'Delivery in 2 days'],
    popular: false,
    color: '#6366f1',
  },
  {
    name: 'Standard',
    price: '$250',
    features: ['Up to 5 pages', 'Custom design', 'Basic SEO', 'Contact form', 'Delivery in 3 days'],
    popular: true,
    color: '#8b5cf6',
  },
  {
    name: 'Premium',
    price: '$500',
    features: ['Full website', 'Advanced design', 'SEO optimization', '30 days support', 'Priority delivery'],
    popular: false,
    color: '#a855f7',
  },
];

// ── Testimonials Data ──
const TESTIMONIALS = [
  {
    name: 'Alex M.',
    role: 'Fitness Coach',
    text: 'Got my landing page in 2 days. Already got my first clients through it!',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Café Owner',
    text: 'Fast, professional, and affordable. The website looks amazing on mobile.',
    rating: 5,
  },
  {
    name: 'Mike T.',
    role: 'E-commerce',
    text: 'My online store was ready in 3 days. Sales started coming in right away.',
    rating: 5,
  },
];

// ── API ──
const getApiUrl = () => {
  const extra = Constants.expoConfig?.extra;
  if (extra?.EXPO_PUBLIC_BACKEND_URL) return extra.EXPO_PUBLIC_BACKEND_URL;
  if (Platform.OS === 'web') return '';
  return 'http://localhost:8001';
};
const API_BASE = getApiUrl();

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function SRWebStudio() {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  // Section refs for scroll-to
  const servicesY = useRef(0);
  const portfolioY = useRef(0);
  const pricingY = useRef(0);
  const contactY = useRef(0);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Testimonials carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialScrollRef = useRef<ScrollView>(null);
  const testimonialScrollX = useRef(new Animated.Value(0)).current;
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchingRef = useRef(false);
  const CARD_W = isSmallScreen ? Math.round(width * 0.82) : Math.min(Math.round(width * 0.85), 400);
  const CARD_GAP = 16;
  const SNAP = CARD_W + CARD_GAP;

  // Contact form
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();

    // CTA pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Testimonials auto-scroll
  useEffect(() => {
    const start = () => {
      autoScrollRef.current = setInterval(() => {
        if (touchingRef.current) return;
        setActiveTestimonial(prev => {
          const next = (prev + 1) % TESTIMONIALS.length;
          testimonialScrollRef.current?.scrollTo({ x: next * SNAP, animated: true });
          return next;
        });
      }, 4500);
    };
    start();
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current); };
  }, []);

  const onTestimonialScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SNAP);
    if (idx >= 0 && idx < TESTIMONIALS.length && idx !== activeTestimonial) setActiveTestimonial(idx);
  };

  const scrollTo = (ref: React.MutableRefObject<number>) => {
    scrollViewRef.current?.scrollTo({ y: ref.current - 60, animated: true });
  };

  const openTelegram = () => Linking.openURL(CONTACT.telegramUrl);
  const openEmail = () => Linking.openURL(`mailto:${CONTACT.email}`);

  const submitForm = async () => {
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      Alert.alert('Please fill in all fields');
      return;
    }
    setFormLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName, email: formEmail, message: formMessage }),
      });
      if (res.ok) {
        setFormSent(true);
        setFormName(''); setFormEmail(''); setFormMessage('');
      }
    } catch (e) {
      Alert.alert('Something went wrong. Try Telegram instead!');
    } finally {
      setFormLoading(false);
    }
  };

  // ───────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ════════ HERO ════════ */}
          <Animated.View style={[styles.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            {/* Background gradient overlay */}
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.12)', 'rgba(0,0,0,0)', 'rgba(139, 92, 246, 0.08)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />

            {/* Logo */}
            <View style={styles.logoRow}>
              <LinearGradient colors={['#6366f1', '#a855f7']} style={styles.logoBox} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={styles.logoLetters}>SR</Text>
              </LinearGradient>
              <Text style={styles.logoLabel}>Web Studio</Text>
            </View>

            {/* Nav row */}
            <View style={styles.navRow}>
              <TouchableOpacity onPress={() => scrollTo(servicesY)}><Text style={styles.navLink}>Services</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => scrollTo(portfolioY)}><Text style={styles.navLink}>Work</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => scrollTo(pricingY)}><Text style={styles.navLink}>Pricing</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => scrollTo(contactY)}><Text style={styles.navLink}>Contact</Text></TouchableOpacity>
            </View>

            {/* Headline */}
            <Text style={styles.heroTitle}>
              Websites that bring clients{'\n'}
              <Text style={styles.heroAccent}>— fast and affordable</Text>
            </Text>

            <Text style={styles.heroSub}>
              I create modern websites for businesses in 2–3 days starting from <Text style={styles.heroAccent}>$100</Text>
            </Text>

            {/* Trust line */}
            <View style={styles.trustBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#6366f1" />
              <Text style={styles.trustText}>Already helped multiple clients launch online</Text>
            </View>

            {/* CTA Buttons */}
            <View style={styles.ctaRow}>
              <TouchableOpacity onPress={openTelegram} activeOpacity={0.85}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.ctaPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <Ionicons name="paper-plane" size={18} color="#fff" />
                    <Text style={styles.ctaPrimaryText}>Order a website</Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => scrollTo(contactY)} activeOpacity={0.85} style={styles.ctaSecondary}>
                <Text style={styles.ctaSecondaryText}>Free consultation</Text>
                <Ionicons name="arrow-forward" size={16} color="#8b5cf6" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* ════════ SERVICES ════════ */}
          <View style={styles.section} onLayout={e => { servicesY.current = e.nativeEvent.layout.y; }}>
            <Text style={styles.sectionLabel}>SERVICES</Text>
            <Text style={styles.sectionTitle}>What I offer</Text>

            <View style={styles.servicesGrid}>
              {SERVICES.map((s, i) => (
                <View key={i} style={styles.serviceCard}>
                  <LinearGradient
                    colors={[`${s.color}18`, `${s.color}08`]}
                    style={styles.serviceCardInner}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={[styles.serviceIcon, { backgroundColor: `${s.color}20` }]}>
                      <Ionicons name={s.icon} size={26} color={s.color} />
                    </View>
                    <Text style={styles.serviceTitle}>{s.title}</Text>
                    <Text style={styles.serviceDesc}>{s.desc}</Text>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </View>

          {/* ════════ WHY CHOOSE ME ════════ */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>ADVANTAGES</Text>
            <Text style={styles.sectionTitle}>Why choose SR Web Studio</Text>

            <View style={styles.advantagesGrid}>
              {ADVANTAGES.map((a, i) => (
                <View key={i} style={styles.advantageRow}>
                  <View style={styles.advantageIconWrap}>
                    <Ionicons name={a.icon} size={22} color="#8b5cf6" />
                  </View>
                  <View style={styles.advantageTextWrap}>
                    <Text style={styles.advantageTitle}>{a.title}</Text>
                    <Text style={styles.advantageDesc}>{a.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* ════════ PORTFOLIO ════════ */}
          <View style={styles.section} onLayout={e => { portfolioY.current = e.nativeEvent.layout.y; }}>
            <Text style={styles.sectionLabel}>PORTFOLIO</Text>
            <Text style={styles.sectionTitle}>My work</Text>

            <View style={styles.portfolioGrid}>
              {PORTFOLIO.map((p, i) => (
                <View key={i} style={styles.portfolioCard}>
                  <LinearGradient colors={p.colors} style={styles.portfolioImage} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Ionicons name={p.icon} size={48} color="rgba(255,255,255,0.7)" />
                  </LinearGradient>
                  <View style={styles.portfolioInfo}>
                    <View style={styles.portfolioTagWrap}>
                      <Text style={styles.portfolioTag}>{p.tag}</Text>
                    </View>
                    <Text style={styles.portfolioTitle}>{p.title}</Text>
                    <Text style={styles.portfolioDesc}>{p.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* ════════ PRICING ════════ */}
          <View style={styles.section} onLayout={e => { pricingY.current = e.nativeEvent.layout.y; }}>
            <Text style={styles.sectionLabel}>PRICING</Text>
            <Text style={styles.sectionTitle}>Simple pricing</Text>

            <View style={styles.pricingGrid}>
              {PRICING.map((plan, i) => (
                <View key={i} style={[styles.pricingCard, plan.popular && styles.pricingCardPopular]}>
                  {plan.popular && (
                    <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.popularBadge} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                      <Text style={styles.popularBadgeText}>Most Popular</Text>
                    </LinearGradient>
                  )}
                  <Text style={styles.pricingName}>{plan.name}</Text>
                  <Text style={styles.pricingPrice}>{plan.price}</Text>
                  <View style={styles.pricingFeatures}>
                    {plan.features.map((f, fi) => (
                      <View key={fi} style={styles.pricingFeatureRow}>
                        <Ionicons name="checkmark-circle" size={16} color={plan.color} />
                        <Text style={styles.pricingFeatureText}>{f}</Text>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity onPress={openTelegram} activeOpacity={0.85}>
                    <LinearGradient
                      colors={plan.popular ? ['#6366f1', '#8b5cf6'] : ['rgba(99,102,241,0.15)', 'rgba(139,92,246,0.15)']}
                      style={styles.pricingBtn}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={[styles.pricingBtnText, !plan.popular && { color: '#8b5cf6' }]}>
                        Get started
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* ════════ TESTIMONIALS ════════ */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>TESTIMONIALS</Text>
            <Text style={styles.sectionTitle}>What clients say</Text>

            <Animated.ScrollView
              ref={testimonialScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={SNAP}
              decelerationRate="fast"
              contentContainerStyle={styles.carouselWrap}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: testimonialScrollX } } }],
                { useNativeDriver: true, listener: onTestimonialScroll }
              )}
              scrollEventThrottle={16}
              onTouchStart={() => { touchingRef.current = true; if (autoScrollRef.current) clearInterval(autoScrollRef.current); }}
              onTouchEnd={() => {
                touchingRef.current = false;
                autoScrollRef.current = setInterval(() => {
                  if (touchingRef.current) return;
                  setActiveTestimonial(prev => {
                    const next = (prev + 1) % TESTIMONIALS.length;
                    testimonialScrollRef.current?.scrollTo({ x: next * SNAP, animated: true });
                    return next;
                  });
                }, 4500);
              }}
              onMomentumScrollEnd={onTestimonialScroll}
            >
              {TESTIMONIALS.map((t, i) => {
                const range = [(i - 1) * SNAP, i * SNAP, (i + 1) * SNAP];
                const scale = testimonialScrollX.interpolate({ inputRange: range, outputRange: [0.9, 1.02, 0.9], extrapolate: 'clamp' });
                const opacity = testimonialScrollX.interpolate({ inputRange: range, outputRange: [0.5, 1, 0.5], extrapolate: 'clamp' });
                return (
                  <Animated.View key={i} style={[styles.testimonialCard, { width: CARD_W, transform: [{ scale }], opacity }]}>
                    <View style={styles.testimonialStars}>
                      {[...Array(t.rating)].map((_, si) => (
                        <Ionicons key={si} name="star" size={14} color="#f59e0b" />
                      ))}
                    </View>
                    <Text style={styles.testimonialText}>"{t.text}"</Text>
                    <View style={styles.testimonialAuthor}>
                      <View style={styles.testimonialAvatar}>
                        <LinearGradient colors={['#6366f1', '#a855f7']} style={styles.testimonialAvatarBg}>
                          <Text style={styles.testimonialAvatarLetter}>{t.name.charAt(0)}</Text>
                        </LinearGradient>
                      </View>
                      <View>
                        <Text style={styles.testimonialName}>{t.name}</Text>
                        <Text style={styles.testimonialRole}>{t.role}</Text>
                      </View>
                    </View>
                  </Animated.View>
                );
              })}
            </Animated.ScrollView>

            {/* Dots */}
            <View style={styles.dots}>
              {TESTIMONIALS.map((_, i) => (
                <View key={i} style={[styles.dot, activeTestimonial === i && styles.dotActive]} />
              ))}
            </View>
          </View>

          {/* ════════ FINAL CTA ════════ */}
          <View style={styles.finalCta}>
            <LinearGradient
              colors={['rgba(99,102,241,0.15)', 'rgba(139,92,246,0.1)']}
              style={styles.finalCtaInner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.finalCtaTitle}>Ready to get your website?</Text>
              <Text style={styles.finalCtaSub}>Let's build something that brings you clients</Text>

              <View style={styles.ctaRow}>
                <TouchableOpacity onPress={openTelegram} activeOpacity={0.85}>
                  <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.ctaPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                      <Ionicons name="paper-plane" size={18} color="#fff" />
                      <Text style={styles.ctaPrimaryText}>Order now</Text>
                    </LinearGradient>
                  </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity onPress={openTelegram} activeOpacity={0.85} style={styles.ctaSecondary}>
                  <Ionicons name="send" size={16} color="#8b5cf6" />
                  <Text style={styles.ctaSecondaryText}>Telegram</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* ════════ CONTACT ════════ */}
          <View style={styles.section} onLayout={e => { contactY.current = e.nativeEvent.layout.y; }}>
            <Text style={styles.sectionLabel}>CONTACT</Text>
            <Text style={styles.sectionTitle}>Get in touch</Text>

            {/* Quick contact buttons */}
            <View style={styles.contactBtns}>
              <TouchableOpacity onPress={openTelegram} activeOpacity={0.85} style={styles.contactBtn}>
                <LinearGradient colors={['#2AABEE', '#229ED9']} style={styles.contactBtnGrad}>
                  <Ionicons name="paper-plane" size={20} color="#fff" />
                  <Text style={styles.contactBtnText}>Telegram</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={openEmail} activeOpacity={0.85} style={styles.contactBtn}>
                <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.contactBtnGrad}>
                  <Ionicons name="mail" size={20} color="#fff" />
                  <Text style={styles.contactBtnText}>Email</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Contact Form */}
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Or send a message</Text>

              {formSent ? (
                <View style={styles.formSuccess}>
                  <Ionicons name="checkmark-circle" size={40} color="#22c55e" />
                  <Text style={styles.formSuccessText}>Message sent! I'll reply soon.</Text>
                  <TouchableOpacity onPress={() => setFormSent(false)}>
                    <Text style={styles.formSuccessLink}>Send another</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    placeholderTextColor="#52525b"
                    value={formName}
                    onChangeText={setFormName}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#52525b"
                    value={formEmail}
                    onChangeText={setFormEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={[styles.input, styles.inputMulti]}
                    placeholder="Tell me about your project..."
                    placeholderTextColor="#52525b"
                    value={formMessage}
                    onChangeText={setFormMessage}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                  <TouchableOpacity onPress={submitForm} activeOpacity={0.85} disabled={formLoading}>
                    <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.formBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                      {formLoading ? (
                        <ActivityIndicator color="#fff" size="small" />
                      ) : (
                        <>
                          <Text style={styles.formBtnText}>Send message</Text>
                          <Ionicons name="send" size={16} color="#fff" />
                        </>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* ════════ FOOTER ════════ */}
          <View style={styles.footer}>
            <View style={styles.footerTop}>
              <View style={styles.logoRow}>
                <LinearGradient colors={['#6366f1', '#a855f7']} style={styles.logoBoxSm} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <Text style={styles.logoLettersSm}>SR</Text>
                </LinearGradient>
                <Text style={styles.logoLabelSm}>Web Studio</Text>
              </View>
              <Text style={styles.footerTagline}>Websites that work</Text>
            </View>

            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={openTelegram} style={styles.footerSocial}>
                <Ionicons name="paper-plane" size={20} color="#8b5cf6" />
              </TouchableOpacity>
              <TouchableOpacity onPress={openEmail} style={styles.footerSocial}>
                <Ionicons name="mail" size={20} color="#8b5cf6" />
              </TouchableOpacity>
            </View>

            <View style={styles.footerDivider} />
            <Text style={styles.footerCopy}>© {new Date().getFullYear()} SR Web Studio. All rights reserved.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ═══════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // ── Hero ──
  hero: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    position: 'relative',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetters: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  logoLabel: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  navRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  navLink: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: '500',
  },

  heroTitle: {
    fontSize: isSmallScreen ? 30 : 38,
    fontWeight: '800',
    color: '#f5f5f5',
    textAlign: 'center',
    lineHeight: isSmallScreen ? 38 : 48,
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  heroAccent: {
    color: '#818cf8',
  },
  heroSub: {
    fontSize: 16,
    color: '#a1a1aa',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
    maxWidth: 400,
    alignSelf: 'center',
  },

  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 24,
  },
  trustText: {
    color: '#71717a',
    fontSize: 13,
  },

  ctaRow: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  ctaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    minWidth: 200,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  ctaPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  ctaSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.3)',
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  ctaSecondaryText: {
    color: '#8b5cf6',
    fontSize: 15,
    fontWeight: '600',
  },

  // ── Sections ──
  section: {
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  sectionLabel: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: isSmallScreen ? 26 : 32,
    fontWeight: '800',
    color: '#f5f5f5',
    textAlign: 'center',
    marginBottom: 28,
    letterSpacing: -0.3,
  },

  // ── Services ──
  servicesGrid: {
    gap: 14,
  },
  serviceCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  serviceCardInner: {
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.12)',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  serviceTitle: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  serviceDesc: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 20,
  },

  // ── Advantages ──
  advantagesGrid: {
    gap: 14,
  },
  advantageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(99,102,241,0.06)',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.1)',
  },
  advantageIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(139,92,246,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  advantageTextWrap: {
    flex: 1,
  },
  advantageTitle: {
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: '700',
  },
  advantageDesc: {
    color: '#71717a',
    fontSize: 13,
    marginTop: 2,
  },

  // ── Portfolio ──
  portfolioGrid: {
    gap: 16,
  },
  portfolioCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(99,102,241,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.1)',
  },
  portfolioImage: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portfolioInfo: {
    padding: 18,
  },
  portfolioTagWrap: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(99,102,241,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  portfolioTag: {
    color: '#818cf8',
    fontSize: 12,
    fontWeight: '600',
  },
  portfolioTitle: {
    color: '#f5f5f5',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  portfolioDesc: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 20,
  },

  // ── Pricing ──
  pricingGrid: {
    gap: 16,
  },
  pricingCard: {
    borderRadius: 16,
    padding: 24,
    backgroundColor: 'rgba(99,102,241,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  pricingCardPopular: {
    borderColor: 'rgba(99,102,241,0.4)',
    backgroundColor: 'rgba(99,102,241,0.1)',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderBottomLeftRadius: 12,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  pricingName: {
    color: '#a1a1aa',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  pricingPrice: {
    color: '#f5f5f5',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 18,
  },
  pricingFeatures: {
    gap: 10,
    marginBottom: 20,
  },
  pricingFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pricingFeatureText: {
    color: '#d4d4d8',
    fontSize: 14,
  },
  pricingBtn: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  pricingBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  // ── Testimonials Carousel ──
  carouselWrap: {
    paddingHorizontal: Math.round((width - (isSmallScreen ? Math.round(width * 0.82) : Math.min(Math.round(width * 0.85), 400))) / 2),
    gap: 16,
    alignItems: 'center',
    paddingVertical: 8,
  },
  testimonialCard: {
    borderRadius: 16,
    padding: 22,
    backgroundColor: 'rgba(99,102,241,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.15)',
  },
  testimonialStars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 12,
  },
  testimonialText: {
    color: '#d4d4d8',
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  testimonialAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  testimonialAvatarBg: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testimonialAvatarLetter: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  testimonialName: {
    color: '#f5f5f5',
    fontSize: 14,
    fontWeight: '700',
  },
  testimonialRole: {
    color: '#71717a',
    fontSize: 12,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(99,102,241,0.2)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#6366f1',
  },

  // ── Final CTA ──
  finalCta: {
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  finalCtaInner: {
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.2)',
  },
  finalCtaTitle: {
    fontSize: isSmallScreen ? 24 : 30,
    fontWeight: '800',
    color: '#f5f5f5',
    textAlign: 'center',
    marginBottom: 8,
  },
  finalCtaSub: {
    color: '#a1a1aa',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
  },

  // ── Contact ──
  contactBtns: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  contactBtn: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  contactBtnGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  contactBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  // ── Form ──
  formCard: {
    backgroundColor: 'rgba(99,102,241,0.06)',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.1)',
  },
  formTitle: {
    color: '#d4d4d8',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 14,
    color: '#f5f5f5',
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.1)',
  },
  inputMulti: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  formBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 4,
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  formBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  formSuccess: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  formSuccessText: {
    color: '#d4d4d8',
    fontSize: 16,
    fontWeight: '600',
  },
  formSuccessLink: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },

  // ── Footer ──
  footer: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerTop: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoBoxSm: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLettersSm: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  logoLabelSm: {
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: '700',
  },
  footerTagline: {
    color: '#52525b',
    fontSize: 13,
    marginTop: 6,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  footerSocial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99,102,241,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    ...(isWeb ? { cursor: 'pointer' } : {}),
  },
  footerDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: 14,
  },
  footerCopy: {
    color: '#3f3f46',
    fontSize: 12,
    textAlign: 'center',
  },
});
