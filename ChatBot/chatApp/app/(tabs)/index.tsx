import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Velkommen til Little Beacon Chatbot 🤖
        </ThemedText>
        <HelloWave />
      </ThemedView>

      {/* 🔽 NYE KNAPPER */}
      <ThemedView style={styles.buttonContainer}>
        <Link href="/chatbot" style={styles.button}>
          <ThemedText style={styles.buttonText}>Chatbot 🤖</ThemedText>
        </Link>

        <Link href="/login" style={styles.button}>
          <ThemedText style={styles.buttonText}>Login 🔐</ThemedText>
        </Link>
      </ThemedView>

    
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Om os:</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Little Beacon er et dansk appbureau, der udvikler intelligente business apps til virksomheder. Vi hjælper med at digitalisere arbejdsprocesser og få systemer til at arbejde smartere sammen`}
        </ThemedText>
      </ThemedView>

     

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#0c1f6c',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});