import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
};

type Service = {
  name: string;
  status: string;
};

const defaultOptions = [
  'Hvad kan du hjælpe med?',
  'Hvordan logger jeg ind?',
  'Hvordan kontakter jeg support?',
  'Jeg vil skrive mit eget spørgsmål',
];

// VIGTIGT:
// Hvis du kører web på samme computer som backend:
// http://127.0.0.1:8000/predict
//
// Hvis du kører på telefon:
// skift til din computers lokale IP, fx:
// http://192.168.1.25:8000/predict
const PREDICT_API_URL = 'http://192.168.111.10:8000/predict';
const SERVICES_API_URL = 'http://192.168.111.10:3001/services';
``

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hej, jeg er Hr Beacon. Hvad kan jeg hjælpe dig med?',
      sender: 'bot',
    },
  ]);

  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch(SERVICES_API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('SERVICES FRA API:', data);
        setServices(data);
      })
      .catch((err) => console.log('Fejl ved hentning af services:', err));
  }, []);

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text,
        sender,
      },
    ]);
  };

  const findServiceReply = (text: string) => {
    const lowerText = text.toLowerCase();

    const foundService = services.find((service) =>
      lowerText.includes(service.name.toLowerCase())
    );

    if (foundService) {
      return `${foundService.name} har status: ${foundService.status}`;
    }

    return null;
  };

  const getIntentReply = (intent: string, userText: string) => {
    const serviceReply = findServiceReply(userText);
    if (serviceReply) return serviceReply;

    switch (intent) {
      case 'greeting':
        return 'Hej! Hvordan kan jeg hjælpe dig i dag?';

      case 'name':
        return 'Jeg hedder Hr Beacon 🤖';

      case 'service':
        return 'Jeg kan hjælpe med login, support, services og generelle spørgsmål.';

      case 'price':
        return 'Hvis du vil vide mere om priser, kan jeg hjælpe dig videre til prisinformation.';

      case 'goodbye':
        return 'Farvel 👋 og hav en god dag!';

      default:
        return getFallbackReply(userText);
    }
  };

  const getFallbackReply = (text: string) => {
    const lowerText = text.toLowerCase();

    const serviceReply = findServiceReply(text);
    if (serviceReply) return serviceReply;

    if (lowerText.includes('hjælpe')) {
      return 'Jeg kan hjælpe med login, support, generelle spørgsmål og vejledning i appen.';
    }

    if (lowerText.includes('login') || lowerText.includes('logge ind')) {
      return 'For at logge ind skal du indtaste din email og adgangskode på login-siden.';
    }

    if (lowerText.includes('support') || lowerText.includes('kontakt')) {
      return 'Du kan kontakte support gennem kontaktformularen eller via virksomhedens supportmail.';
    }

    if (lowerText.includes('eget spørgsmål')) {
      return 'Selvfølgelig. Skriv bare dit spørgsmål i feltet nedenfor.';
    }

    return 'Tak for dit spørgsmål. Jeg prøver at hjælpe så godt jeg kan.';
  };

  const askBackend = async (text: string) => {
    const response = await fetch(PREDICT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Backend fejl: ${response.status}`);
    }

    return response.json();
  };

  const handleUserMessage = async (text: string) => {
    addMessage(text, 'user');
    setShowOptions(false);

    try {
      const data = await askBackend(text);
      console.log('MODEL RESPONSE:', data);

      const botReply = getIntentReply(data.intent, text);
      addMessage(botReply, 'bot');
    } catch (error) {
      console.log('Fejl ved backend/model:', error);
      const fallbackReply = getFallbackReply(text);
      addMessage(fallbackReply, 'bot');
    }
  };

  const handleOptionPress = async (option: string) => {
    await handleUserMessage(option);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');

    await handleUserMessage(userText);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hr Beacon 🤖</Text>
          <Text style={styles.headerSubtitle}>Din hjælpsomme chatbot</Text>
        </View>

        <ScrollView
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageRow,
                message.sender === 'user' ? styles.userRow : styles.botRow,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  message.sender === 'user'
                    ? styles.userBubble
                    : styles.botBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === 'user'
                      ? styles.userMessageText
                      : styles.botMessageText,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ))}

          {showOptions && (
            <View style={styles.optionsContainer}>
              {defaultOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleOptionPress(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Skriv dit spørgsmål her..."
            placeholderTextColor="#7aa6d9"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF4FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAF4FF',
  },
  header: {
    backgroundColor: '#0B4F8A',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: '#CBE7FF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 24,
  },
  messageRow: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  botBubble: {
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#0B84F3',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botMessageText: {
    color: '#123456',
  },
  userMessageText: {
    color: 'white',
  },
  optionsContainer: {
    marginTop: 10,
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#D8ECFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A8D3FF',
  },
  optionText: {
    color: '#0B4F8A',
    fontSize: 15,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 16 : 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#D6E6F5',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F8FF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#123456',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#C7E0F8',
  },
  sendButton: {
    backgroundColor: '#0B84F3',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
});