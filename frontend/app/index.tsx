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
  Modal,
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 400;
const isWeb = Platform.OS === 'web';

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

// Enhanced 3D Service Card Component with STRONG micro-interactions
const ServiceCard = ({ service, index }: { service: typeof SERVICES[0]; index: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const iconFloatAnim = useRef(new Animated.Value(0)).current;
  const shineAnim = useRef(new Animated.Value(0)).current;
  const rotateXAnim = useRef(new Animated.Value(0)).current;
  const rotateYAnim = useRef(new Animated.Value(0)).current;
  const liftAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation - stronger
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        tension: 40,
        delay: index * 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous icon floating animation - more visible
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconFloatAnim, {
          toValue: 1,
          duration: 1800 + (index * 150),
          useNativeDriver: true,
        }),
        Animated.timing(iconFloatAnim, {
          toValue: 0,
          duration: 1800 + (index * 150),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Mobile breathing effect - subtle 3D feel
    if (!isWeb) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(breatheAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(breatheAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.04,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shineAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(liftAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(rotateXAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rotateYAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(shineAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(liftAnim, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(rotateXAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateYAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Stronger glow effect
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.35],
  });

  // Icon float - more visible
  const iconFloat = iconFloatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const iconScale = iconFloatAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1],
  });

  // Shine effect
  const shineTranslate = shineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 200],
  });

  const shineOpacity = shineAnim.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: [0, 0.4, 0.4, 0],
  });

  // 3D rotation
  const rotateX = rotateXAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-4deg'],
  });

  const rotateY = rotateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '6deg'],
  });

  // Lift effect
  const lift = liftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  // Mobile breathing
  const breatheScale = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.015],
  });

  const breatheRotate = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1deg'],
  });

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[
        styles.serviceCard, 
        { 
          opacity: fadeAnim, 
          transform: [
            { translateY: Animated.add(translateY, lift) }, 
            { scale: isWeb ? scaleAnim : Animated.multiply(scaleAnim, breatheScale) },
            { perspective: 1000 },
            { rotateX },
            { rotateY },
            ...(!isWeb ? [{ rotate: breatheRotate }] : []),
          ] 
        }
      ]}>
        {/* Strong neon glow border */}
        <Animated.View style={[styles.cardNeonGlow, { opacity: glowOpacity }]} />
        
        {/* Glow effect overlay */}
        <Animated.View style={[styles.cardGlowOverlay, { opacity: glowOpacity }]} />
        
        {/* Diagonal shine effect */}
        <Animated.View style={[
          styles.cardShineEffect,
          { 
            opacity: shineOpacity,
            transform: [{ translateX: shineTranslate }, { skewX: '-20deg' }]
          }
        ]} />
        
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.18)', 'rgba(59, 130, 246, 0.08)']}
          style={styles.serviceCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Floating animated icon */}
          <Animated.View style={[
            styles.serviceIconContainer,
            { transform: [{ translateY: iconFloat }, { scale: iconScale }] }
          ]}>
            <View style={styles.iconGlowWrapper}>
              <LinearGradient
                colors={['#8b5cf6', '#ec4899', '#3b82f6']}
                style={styles.serviceIconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name={service.icon as any} size={26} color="#fff" />
              </LinearGradient>
            </View>
          </Animated.View>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

// Enhanced Portfolio Card Component with STRONG 3D effects
const PortfolioCard = ({ project, index, onPress }: { project: typeof PORTFOLIO[0]; index: number; onPress: () => void }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(60)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const shineAnim = useRef(new Animated.Value(0)).current;
  const expandIconAnim = useRef(new Animated.Value(0)).current;
  const rotateXAnim = useRef(new Animated.Value(0)).current;
  const rotateYAnim = useRef(new Animated.Value(0)).current;
  const liftAnim = useRef(new Animated.Value(0)).current;
  const imageZoomAnim = useRef(new Animated.Value(1)).current;
  const textLiftAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stronger entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: index * 180,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 6,
        tension: 35,
        delay: index * 180,
        useNativeDriver: true,
      }),
    ]).start();

    // Expand icon pulse - more visible
    Animated.loop(
      Animated.sequence([
        Animated.timing(expandIconAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(expandIconAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Mobile breathing effect
    if (!isWeb) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(breatheAnim, {
            toValue: 1,
            duration: 3500,
            useNativeDriver: true,
          }),
          Animated.timing(breatheAnim, {
            toValue: 0,
            duration: 3500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.035,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(shineAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(liftAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(rotateXAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rotateYAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(imageZoomAnim, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(textLiftAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(shineAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(liftAnim, {
        toValue: 0,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(rotateXAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(rotateYAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(imageZoomAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(textLiftAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Stronger glow effect
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  // Shine sweep
  const shineTranslate = shineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 250],
  });

  const shineOpacity = shineAnim.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 0.5, 0.5, 0],
  });

  // Expand icon animations - more visible
  const expandIconScale = expandIconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const expandIconOpacity = expandIconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  // 3D rotations
  const rotateX = rotateXAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-5deg'],
  });

  const rotateY = rotateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '7deg'],
  });

  // Lift effect
  const lift = liftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  // Text lift on hover
  const textLift = textLiftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  // Mobile breathing
  const breatheScale = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.012],
  });

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[
        styles.portfolioCard, 
        { 
          opacity: fadeAnim, 
          transform: [
            { translateY: Animated.add(translateY, lift) }, 
            { scale: isWeb ? scaleAnim : Animated.multiply(scaleAnim, breatheScale) },
            { perspective: 1000 },
            { rotateX },
            { rotateY },
          ] 
        }
      ]}>
        {/* Neon glow border */}
        <Animated.View style={[styles.portfolioNeonGlow, { opacity: glowOpacity }]} />
        
        {/* Glow effect overlay */}
        <Animated.View style={[styles.portfolioGlowOverlay, { opacity: glowOpacity }]} />
        
        {/* Shine effect */}
        <Animated.View style={[
          styles.portfolioShineEffect,
          { 
            opacity: shineOpacity,
            transform: [{ translateX: shineTranslate }, { skewX: '-20deg' }]
          }
        ]} />
        
        {/* Header with zoom effect */}
        <Animated.View style={{ transform: [{ scale: imageZoomAnim }], overflow: 'hidden' }}>
          <LinearGradient
            colors={project.gradient}
            style={styles.portfolioCardHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.portfolioTag}>
              <Text style={styles.portfolioTagText}>{project.tag}</Text>
            </View>
            <Animated.View style={[
              styles.expandButton,
              { 
                transform: [{ scale: expandIconScale }],
                opacity: expandIconOpacity
              }
            ]}>
              <TouchableOpacity 
                onPress={onPress}
                activeOpacity={0.7}
                style={styles.expandButtonInner}
              >
                <Ionicons name="expand-outline" size={26} color="rgba(255,255,255,1)" />
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
        
        {/* Content with text lift */}
        <Animated.View style={[
          styles.portfolioCardContent,
          { transform: [{ translateY: textLift }] }
        ]}>
          <Text style={styles.portfolioTitle}>{project.title}</Text>
          <Text style={styles.portfolioDescription}>{project.description}</Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

// Enhanced Process Step Component with entrance animation
const ProcessStep = ({ step, index, isLast }: { step: typeof PROCESS_STEPS[0]; index: number; isLast: boolean }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        friction: 8,
        tension: 40,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: index * 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[
      styles.processStep, 
      { 
        opacity: fadeAnim, 
        transform: [{ translateX }, { scale: scaleAnim }] 
      }
    ]}>
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
    </Animated.View>
  );
};

export default function Index() {
  const insets = useSafeAreaInsets();
  const heroFadeAnim = useRef(new Animated.Value(0)).current;
  const heroScaleAnim = useRef(new Animated.Value(0.9)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  // Floating orbs animations
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;
  const orb4Anim = useRef(new Animated.Value(0)).current;
  
  // Parallax scroll position
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Modal state for portfolio preview
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO[0] | null>(null);
  const modalScaleAnim = useRef(new Animated.Value(0)).current;
  const modalOpacityAnim = useRef(new Animated.Value(0)).current;
  
  // Refs for scrolling
  const scrollViewRef = useRef<ScrollView>(null);
  const servicesSectionY = useRef(0);
  const portfolioSectionY = useRef(0);
  const aboutSectionY = useRef(0);

  useEffect(() => {
    // Hero animations
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

    // Continuous glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating orb animations
    Animated.loop(
      Animated.sequence([
        Animated.timing(orb1Anim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(orb1Anim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(orb2Anim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(orb2Anim, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(orb3Anim, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(orb3Anim, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(orb4Anim, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(orb4Anim, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Parallax interpolations
  const parallaxBg = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const parallaxOrbs = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  // Orb floating translations
  const orb1TranslateY = orb1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });
  const orb1TranslateX = orb1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15],
  });

  const orb2TranslateY = orb2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 25],
  });
  const orb2TranslateX = orb2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const orb3TranslateY = orb3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const orb4TranslateY = orb4Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });
  const orb4TranslateX = orb4Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  // Handle scroll for parallax
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  // Open modal with animation
  const openProjectModal = (project: typeof PORTFOLIO[0]) => {
    setSelectedProject(project);
    setModalVisible(true);
    Animated.parallel([
      Animated.spring(modalScaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 65,
        useNativeDriver: true,
      }),
      Animated.timing(modalOpacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Close modal with animation
  const closeProjectModal = () => {
    Animated.parallel([
      Animated.timing(modalScaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(modalOpacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      setSelectedProject(null);
    });
  };

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

  const scrollToServices = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: servicesSectionY.current,
        animated: true,
      });
    }
  };

  const scrollToPortfolio = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: portfolioSectionY.current,
        animated: true,
      });
    }
  };

  const scrollToAbout = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: aboutSectionY.current,
        animated: true,
      });
    }
  };

  // Interpolate glow opacity
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  // Floating particles component - LARGER and more visible
  const FloatingParticles = () => {
    const particles = [
      // Large glowing orbs
      { top: '5%', left: '10%', size: 16, delay: 0, duration: 5000, color: 'rgba(139, 92, 246, 0.15)', blur: true },
      { top: '20%', right: '15%', size: 20, delay: 800, duration: 6000, color: 'rgba(236, 72, 153, 0.12)', blur: true },
      { top: '35%', left: '85%', size: 14, delay: 400, duration: 5500, color: 'rgba(59, 130, 246, 0.14)', blur: false },
      // Medium particles
      { top: '50%', left: '5%', size: 12, delay: 1200, duration: 4500, color: 'rgba(139, 92, 246, 0.18)', blur: false },
      { top: '65%', right: '10%', size: 18, delay: 600, duration: 5800, color: 'rgba(6, 182, 212, 0.12)', blur: true },
      { top: '78%', left: '40%', size: 10, delay: 1600, duration: 4200, color: 'rgba(236, 72, 153, 0.15)', blur: false },
      // Small accent particles
      { top: '15%', left: '60%', size: 8, delay: 300, duration: 3500, color: 'rgba(139, 92, 246, 0.2)', blur: false },
      { top: '45%', right: '35%', size: 6, delay: 1000, duration: 4000, color: 'rgba(236, 72, 153, 0.18)', blur: false },
      { top: '85%', left: '75%', size: 8, delay: 500, duration: 3800, color: 'rgba(59, 130, 246, 0.16)', blur: false },
    ];

    return (
      <View style={styles.particlesContainer}>
        {particles.map((p, i) => {
          const particleAnim = useRef(new Animated.Value(0)).current;
          
          useEffect(() => {
            Animated.loop(
              Animated.sequence([
                Animated.timing(particleAnim, {
                  toValue: 1,
                  duration: p.duration,
                  delay: p.delay,
                  useNativeDriver: true,
                }),
                Animated.timing(particleAnim, {
                  toValue: 0,
                  duration: p.duration,
                  useNativeDriver: true,
                }),
              ])
            ).start();
          }, []);

          const particleY = particleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -25],
          });

          const particleX = particleAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, i % 2 === 0 ? 10 : -10, 0],
          });

          const particleOpacity = particleAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.4, 1, 0.4],
          });

          const particleScale = particleAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.2, 1],
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.particle,
                p.blur ? styles.particleBlurred : null,
                {
                  top: p.top,
                  left: p.left,
                  right: p.right,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  opacity: particleOpacity,
                  transform: [
                    { translateY: particleY },
                    { translateX: particleX },
                    { scale: particleScale },
                  ],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      
      {/* Floating micro particles */}
      <FloatingParticles />
      
      <Animated.ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* Animated Glow Background with Parallax */}
          <Animated.View style={[
            styles.heroGlowAnimated, 
            { 
              opacity: glowOpacity,
              transform: [{ translateY: parallaxBg }]
            }
          ]}>
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.45)', 'rgba(236, 72, 153, 0.25)', 'transparent']}
              style={styles.heroGlowGradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </Animated.View>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.3)', 'rgba(236, 72, 153, 0.15)', 'transparent']}
            style={styles.heroGlow}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          
          {/* Enhanced floating orbs with parallax and animations */}
          <Animated.View style={[styles.orbContainer, { transform: [{ translateY: parallaxOrbs }] }]}>
            {/* Large purple orb - top right */}
            <Animated.View style={[
              styles.orb, 
              styles.orbPurple, 
              { 
                opacity: glowOpacity,
                transform: [{ translateY: orb1TranslateY }, { translateX: orb1TranslateX }]
              }
            ]} />
            
            {/* Pink orb - left side */}
            <Animated.View style={[
              styles.orb, 
              styles.orbPink, 
              { 
                opacity: glowOpacity,
                transform: [{ translateY: orb2TranslateY }, { translateX: orb2TranslateX }]
              }
            ]} />
            
            {/* Blue orb - bottom right */}
            <Animated.View style={[
              styles.orb, 
              styles.orbBlue, 
              { 
                opacity: glowOpacity,
                transform: [{ translateY: orb3TranslateY }]
              }
            ]} />
            
            {/* Additional cyan orb - bottom left */}
            <Animated.View style={[
              styles.orb, 
              styles.orbCyan, 
              { 
                opacity: glowOpacity,
                transform: [{ translateY: orb4TranslateY }, { translateX: orb4TranslateX }]
              }
            ]} />
            
            {/* Small accent orbs */}
            <Animated.View style={[
              styles.orbSmall, 
              styles.orbSmallPurple, 
              { opacity: glowOpacity }
            ]} />
            <Animated.View style={[
              styles.orbSmall, 
              styles.orbSmallPink, 
              { opacity: glowOpacity }
            ]} />
          </Animated.View>
          
          <Animated.View style={[styles.heroContent, { opacity: heroFadeAnim, transform: [{ scale: heroScaleAnim }] }]}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoGlowWrapper}>
                <LinearGradient
                  colors={['#8b5cf6', '#ec4899', '#3b82f6']}
                  style={styles.logoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.logoText}>SR</Text>
                </LinearGradient>
              </View>
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
                colors={['rgba(139, 92, 246, 0.35)', 'rgba(59, 130, 246, 0.35)']}
                style={styles.badge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="location-outline" size={14} color="#a78bfa" />
                <Text style={styles.badgeText}>Dla firm usługowych i lokalnych biznesów w Polsce</Text>
              </LinearGradient>
            </View>

            {/* CTA Buttons */}
            <View style={styles.ctaContainer}>
              <TouchableOpacity onPress={openEmail} activeOpacity={0.85}>
                <View style={styles.primaryButtonGlow}>
                  <LinearGradient
                    colors={['#8b5cf6', '#d946ef', '#ec4899']}
                    style={styles.primaryButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.primaryButtonText}>Darmowa analiza</Text>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                  </LinearGradient>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} onPress={scrollToPortfolio} activeOpacity={0.7}>
                <Text style={styles.secondaryButtonText}>Zobacz realizacje</Text>
                <Ionicons name="chevron-down" size={18} color="#a78bfa" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {/* Trust Section */}
        <View style={styles.trustSection}>
          <View style={styles.trustGrid}>
            {/* Card 1 - Projects */}
            <View style={styles.trustCard}>
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.15)', 'rgba(59, 130, 246, 0.08)']}
                style={styles.trustCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.trustIconWrapper}>
                  <LinearGradient
                    colors={['#8b5cf6', '#6366f1']}
                    style={styles.trustIconGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="checkmark-done" size={20} color="#fff" />
                  </LinearGradient>
                </View>
                <View style={styles.trustCardContent}>
                  <Text style={styles.trustCardTitle}>10+ zrealizowanych projektów</Text>
                  <Text style={styles.trustCardDescription}>Doświadczenie w tworzeniu stron i sklepów online</Text>
                </View>
              </LinearGradient>
            </View>

            {/* Card 2 - Technologies */}
            <View style={styles.trustCard}>
              <LinearGradient
                colors={['rgba(236, 72, 153, 0.15)', 'rgba(139, 92, 246, 0.08)']}
                style={styles.trustCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.trustIconWrapper}>
                  <LinearGradient
                    colors={['#ec4899', '#8b5cf6']}
                    style={styles.trustIconGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="code-slash" size={20} color="#fff" />
                  </LinearGradient>
                </View>
                <View style={styles.trustCardContent}>
                  <Text style={styles.trustCardTitle}>Nowoczesne technologie</Text>
                  <Text style={styles.trustCardDescription}>Pracujemy z wykorzystaniem Next.js, SEO i najlepszych praktyk</Text>
                </View>
              </LinearGradient>
            </View>

            {/* Card 3 - Fast delivery */}
            <View style={styles.trustCard}>
              <LinearGradient
                colors={['rgba(59, 130, 246, 0.15)', 'rgba(6, 182, 212, 0.08)']}
                style={styles.trustCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.trustIconWrapper}>
                  <LinearGradient
                    colors={['#3b82f6', '#06b6d4']}
                    style={styles.trustIconGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="flash" size={20} color="#fff" />
                  </LinearGradient>
                </View>
                <View style={styles.trustCardContent}>
                  <Text style={styles.trustCardTitle}>Szybka realizacja</Text>
                  <Text style={styles.trustCardDescription}>Sprawna komunikacja i wsparcie na każdym etapie projektu</Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Services Section */}
        <View 
          style={styles.section}
          onLayout={(event) => {
            servicesSectionY.current = event.nativeEvent.layout.y;
          }}
        >
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
              <PortfolioCard 
                key={index} 
                project={project} 
                index={index} 
                onPress={() => openProjectModal(project)}
              />
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

        {/* About Section */}
        <View 
          style={styles.aboutSection}
          onLayout={(event) => {
            aboutSectionY.current = event.nativeEvent.layout.y;
          }}
        >
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.05)']}
            style={styles.aboutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.aboutIconWrapper}>
              <LinearGradient
                colors={['#8b5cf6', '#ec4899']}
                style={styles.aboutIconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="people" size={28} color="#fff" />
              </LinearGradient>
            </View>
            <Text style={styles.aboutTitle}>O nas</Text>
            <Text style={styles.aboutText}>
              Jesteśmy zespołem pasjonatów web developmentu. Specjalizujemy się w tworzeniu nowoczesnych stron internetowych i sklepów online dla firm usługowych i lokalnych biznesów w Polsce.
            </Text>
            <Text style={styles.aboutText}>
              Łączymy kreatywność z technologią, aby dostarczać rozwiązania, które nie tylko wyglądają profesjonalnie, ale przede wszystkim przynoszą realne rezultaty biznesowe.
            </Text>
            <View style={styles.aboutStats}>
              <View style={styles.aboutStat}>
                <Text style={styles.aboutStatNumber}>10+</Text>
                <Text style={styles.aboutStatLabel}>Projektów</Text>
              </View>
              <View style={styles.aboutStatDivider} />
              <View style={styles.aboutStat}>
                <Text style={styles.aboutStatNumber}>100%</Text>
                <Text style={styles.aboutStatLabel}>Zadowolenia</Text>
              </View>
              <View style={styles.aboutStatDivider} />
              <View style={styles.aboutStat}>
                <Text style={styles.aboutStatNumber}>24/7</Text>
                <Text style={styles.aboutStatLabel}>Wsparcie</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Final CTA Section */}
        <View style={styles.ctaSection}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.2)', 'rgba(236, 72, 153, 0.15)']}
            style={styles.ctaSectionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaSectionTitle}>Zbuduj stronę, która zacznie zarabiać</Text>
            <Text style={styles.ctaSectionText}>
              Otrzymaj darmową analizę i dowiedz się, jak możemy zwiększyć liczbę klientów w Twoim biznesie
            </Text>

            <TouchableOpacity onPress={openWhatsApp} activeOpacity={0.85}>
              <View style={styles.ctaButtonGlow}>
                <LinearGradient
                  colors={['#25D366', '#20c060', '#128C7E']}
                  style={styles.primaryButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                  <Text style={styles.primaryButtonText}>Darmowa analiza</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>

            {/* Secondary Contact Option */}
            <TouchableOpacity style={styles.secondaryContactButton} onPress={openEmail} activeOpacity={0.7}>
              <Ionicons name="mail-outline" size={18} color="#a78bfa" />
              <Text style={styles.secondaryContactText}>lub napisz email</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
          {/* Logo */}
          <View style={styles.footerLogo}>
            <View style={styles.footerLogoGlowWrapper}>
              <LinearGradient
                colors={['#8b5cf6', '#ec4899', '#3b82f6']}
                style={styles.footerLogoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.footerLogoText}>SR</Text>
              </LinearGradient>
            </View>
            <Text style={styles.footerLogoName}>Web Studio</Text>
          </View>

          {/* Footer Menu */}
          <View style={styles.footerMenu}>
            <TouchableOpacity onPress={scrollToPortfolio} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Realizacje</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={scrollToServices} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Usługi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={scrollToAbout} activeOpacity={0.7}>
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
      </Animated.ScrollView>

      {/* Project Preview Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeProjectModal}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: modalOpacityAnim }]}>
          <Pressable style={styles.modalBackdrop} onPress={closeProjectModal} />
          <Animated.View style={[
            styles.modalContainer,
            { transform: [{ scale: modalScaleAnim }] }
          ]}>
            {selectedProject && (
              <View style={styles.modalContent}>
                {/* Modal Header with Gradient */}
                <LinearGradient
                  colors={selectedProject.gradient}
                  style={styles.modalHeader}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.modalHeaderContent}>
                    <View style={styles.modalTag}>
                      <Text style={styles.modalTagText}>{selectedProject.tag}</Text>
                    </View>
                    <TouchableOpacity 
                      onPress={closeProjectModal}
                      style={styles.modalCloseButton}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalHeaderIcon}>
                    <Ionicons 
                      name={
                        selectedProject.tag === 'Strona WWW' ? 'globe-outline' :
                        selectedProject.tag === 'E-commerce' ? 'cart-outline' : 'code-slash-outline'
                      } 
                      size={48} 
                      color="rgba(255,255,255,0.9)" 
                    />
                  </View>
                </LinearGradient>

                {/* Modal Body */}
                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>{selectedProject.title}</Text>
                  <Text style={styles.modalDescription}>{selectedProject.description}</Text>
                  
                  {/* Project Details */}
                  <View style={styles.modalDetails}>
                    <View style={styles.modalDetailItem}>
                      <Ionicons name="checkmark-circle" size={20} color="#8b5cf6" />
                      <Text style={styles.modalDetailText}>Projekt zakończony</Text>
                    </View>
                    <View style={styles.modalDetailItem}>
                      <Ionicons name="trending-up" size={20} color="#10b981" />
                      <Text style={styles.modalDetailText}>Zwiększona konwersja</Text>
                    </View>
                    <View style={styles.modalDetailItem}>
                      <Ionicons name="star" size={20} color="#f59e0b" />
                      <Text style={styles.modalDetailText}>Zadowolony klient</Text>
                    </View>
                  </View>

                  {/* CTA Button */}
                  <TouchableOpacity onPress={() => { closeProjectModal(); openWhatsApp(); }} activeOpacity={0.8}>
                    <LinearGradient
                      colors={['#8b5cf6', '#ec4899']}
                      style={styles.modalCTA}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.modalCTAText}>Zamów podobny projekt</Text>
                      <Ionicons name="arrow-forward" size={18} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </Modal>
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
    minHeight: 620,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 450,
  },
  heroGlowAnimated: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    height: 500,
  },
  heroGlowGradient: {
    flex: 1,
    borderRadius: 200,
  },
  orbContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: 200,
  },
  orbPurple: {
    width: 250,
    height: 250,
    top: -80,
    right: -100,
    backgroundColor: 'rgba(139, 92, 246, 0.18)',
  },
  orbPink: {
    width: 180,
    height: 180,
    top: 220,
    left: -80,
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
  },
  orbBlue: {
    width: 140,
    height: 140,
    bottom: 80,
    right: -50,
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
  },
  orbCyan: {
    width: 160,
    height: 160,
    bottom: 180,
    left: -70,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
  orbSmall: {
    position: 'absolute',
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  orbSmallPurple: {
    top: 350,
    right: 30,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  orbSmallPink: {
    top: 120,
    left: 50,
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoGlowWrapper: {
    borderRadius: 14,
    padding: 2,
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
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  badgeText: {
    color: '#e4e4e7',
    fontSize: 13,
    marginLeft: 6,
  },
  ctaContainer: {
    alignItems: 'center',
    gap: 16,
  },
  primaryButtonGlow: {
    borderRadius: 14,
    padding: 2,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 17,
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

  // Trust Section Styles
  trustSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  trustGrid: {
    gap: 12,
  },
  trustCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  trustCardGradient: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  trustIconWrapper: {
    flexShrink: 0,
  },
  trustIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trustCardContent: {
    flex: 1,
  },
  trustCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  trustCardDescription: {
    fontSize: 13,
    color: '#a1a1aa',
    lineHeight: 18,
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
    gap: 18,
  },
  serviceCard: {
    borderRadius: 20,
    overflow: 'visible',
    position: 'relative',
  },
  cardNeonGlow: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 23,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.6)',
    zIndex: -1,
  },
  cardGlowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.35)',
    zIndex: 10,
  },
  cardShineEffect: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    zIndex: 11,
  },
  serviceCardGradient: {
    padding: 26,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.35)',
  },
  iconGlowWrapper: {
    borderRadius: 14,
    padding: 2,
  },
  serviceIconContainer: {
    marginBottom: 18,
  },
  serviceIconGradient: {
    width: 54,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#a1a1aa',
    lineHeight: 22,
  },

  // Portfolio Grid
  portfolioGrid: {
    gap: 22,
  },
  portfolioCard: {
    borderRadius: 20,
    overflow: 'visible',
    backgroundColor: '#18181b',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    position: 'relative',
  },
  portfolioNeonGlow: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 23,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(236, 72, 153, 0.5)',
    zIndex: -1,
  },
  portfolioGlowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    zIndex: 10,
  },
  portfolioShineEffect: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 11,
  },
  portfolioCardHeader: {
    height: 150,
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

  // About Section
  aboutSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  aboutGradient: {
    padding: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
    alignItems: 'center',
  },
  aboutIconWrapper: {
    marginBottom: 20,
  },
  aboutIconGradient: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 15,
    color: '#a1a1aa',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  aboutStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.2)',
    width: '100%',
  },
  aboutStat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  aboutStatNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#a78bfa',
    marginBottom: 6,
  },
  aboutStatLabel: {
    fontSize: 13,
    color: '#71717a',
    fontWeight: '500',
    textAlign: 'center',
  },
  aboutStatDivider: {
    width: 1,
    height: 50,
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    marginHorizontal: 8,
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
    borderColor: 'rgba(139, 92, 246, 0.3)',
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
  ctaButtonGlow: {
    borderRadius: 14,
    padding: 2,
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
    color: '#a78bfa',
    fontSize: 14,
    fontWeight: '500',
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.15)',
    alignItems: 'center',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  footerLogoGlowWrapper: {
    borderRadius: 10,
    padding: 2,
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
    gap: 28,
    marginBottom: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerLink: {
    color: '#a78bfa',
    fontSize: 14,
    fontWeight: '600',
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
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  copyright: {
    color: '#52525b',
    fontSize: 13,
    textAlign: 'center',
  },

  // Portfolio expand button
  expandButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  modalContent: {
    width: '100%',
  },
  modalHeader: {
    padding: 20,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  modalHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  modalTagText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeaderIcon: {
    alignItems: 'center',
    marginTop: 10,
  },
  modalBody: {
    padding: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 15,
    color: '#a1a1aa',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalDetails: {
    marginBottom: 24,
    gap: 12,
  },
  modalDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalDetailText: {
    fontSize: 14,
    color: '#d4d4d8',
    fontWeight: '500',
  },
  modalCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 10,
  },
  modalCTAText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // Micro-interaction styles - LARGER particles
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    borderRadius: 100,
  },
  particleBlurred: {
    opacity: 0.6,
  },
  expandButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
