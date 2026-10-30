
import { useState, useEffect, useRef } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  Pressable,
  Button,
  Alert,
  TextInput,
} from 'react-native';

const COLORS = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  text: '#1B1F2A',
  muted: '#6B7280',
  primary: '#2F6FED',
  primaryLight: '#E6EEFF',
  border: '#E5E7EB',
  online: '#22C55E',
  offline: '#9CA3AF',
  error: '#DC2626',
};

const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community. When I am not coding, I mentor junior developers, contribute to open source and explore new coffee shops around the city.';

const SKILLS = [
  'React Native',
  'JavaScript',
  'UI Design',
  'Git',
  'Flexbox',
];

const BASE_FOLLOWERS = 1200;
const MAX_MESSAGE = 140;

// Formats 1200 as 1,200
function formatCount(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// BONUS 3: Reusable Tag component
function Tag({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tag,
        selected && styles.tagSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.tagText,
          selected && styles.tagTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function App() {
  // STEP 3: Follow / Unfollow
  const [isFollowing, setIsFollowing] = useState(false);

  // Derived value, not another state
  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);

  // BONUS 1: Disable Follow for 2 seconds
  const [isBusy, setIsBusy] = useState(false);
  const followTimerRef = useRef(null);

  // STEP 4: Message composer
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [message, setMessage] = useState('');

  // BONUS 2: Message validation
  const [messageError, setMessageError] = useState('');

  // STEP 5: Interactive profile
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (followTimerRef.current !== null) {
        clearTimeout(followTimerRef.current);
      }
    };
  }, []);

  // STEP 3 + BONUS 1: Follow / Unfollow
  const handleFollowPress = () => {
    if (isBusy) {
      return;
    }

    setIsFollowing(previous => !previous);
    setIsBusy(true);

    followTimerRef.current = setTimeout(() => {
      setIsBusy(false);
      followTimerRef.current = null;
    }, 2000);
  };

  // STEP 4: Open / Close composer
  const handleMessagePress = () => {
    setIsComposerOpen(previous => !previous);
    setMessageError('');
  };

  // STEP 4 + BONUS 2: Send message
  const handleSendPress = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
      return;
    }

    // BONUS 2: Show error when maximum length is reached
    if (message.length === MAX_MESSAGE) {
      setMessageError('Longitud máxima alcanzada');
      return;
    }

    Alert.alert('Message sent', trimmedMessage);

    setMessage('');
    setMessageError('');
    setIsComposerOpen(false);
  };

  // Update message and clear previous error
  const handleMessageChange = (newText) => {
    setMessage(newText);
    setMessageError('');
  };

  // STEP 1: Share
  const handleSharePress = () => {
    Alert.alert('Share', 'You pressed Profile');
  };

  // STEP 5: Expand / Collapse biography
  const handleBioPress = () => {
    setIsBioExpanded(previous => !previous);
  };

  // STEP 5: Online / Offline
  const handleAvatarPress = () => {
    setIsOnline(previous => !previous);
  };

  // STEP 5: Select / Deselect skills
  const handleSkillPress = (skill) => {
    setSelectedSkills(previous => {
      if (previous.includes(skill)) {
        return previous.filter(item => item !== skill);
      }

      return [...previous, skill];
    });
  };

  // Statistics
  const stats = [
    { label: 'Projects', value: '24' },
    { label: 'Followers', value: formatCount(followers) },
    { label: 'Following', value: '180' },
  ];

  // Disable Send when message is empty or only spaces
  const isSendDisabled = message.trim().length === 0;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.screenContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>

        {/* Banner */}
        <Image
          source={require('./assets/banner.png')}
          style={styles.banner}
          resizeMode="cover"
        />

        <View style={styles.body}>

          {/* STEP 5: Interactive avatar */}
          <View style={styles.headerRow}>

            <Pressable
              onPress={handleAvatarPress}
              accessibilityRole="button"
              accessibilityLabel="Toggle online status"
            >
              <Image
                source={require('./assets/avatar.png')}
                style={styles.avatar}
              />

              <View
                style={[
                  styles.onlineBadge,
                  !isOnline && styles.offlineBadge,
                ]}
              />
            </Pressable>

            <View style={styles.headerText}>
              <Text style={styles.name}>
                Alex Rivera
              </Text>

              <Text style={styles.role}>
                Mobile Developer
              </Text>

              <Text style={styles.location}>
                Lisbon, Portugal
              </Text>
            </View>

          </View>

          {/* STEP 5: Expandable biography */}
          <Text
            style={styles.bio}
            numberOfLines={isBioExpanded ? undefined : 3}
          >
            {BIO}
          </Text>

          <Pressable onPress={handleBioPress}>
            <Text style={styles.readMoreText}>
              {isBioExpanded ? 'Show less' : 'Read more'}
            </Text>
          </Pressable>

          {/* Statistics */}
          <View style={styles.statsRow}>
            {stats.map((item, index) => (
              <View
                key={item.label}
                style={[
                  styles.stat,
                  index < stats.length - 1 && styles.statDivider,
                ]}
              >
                <Text style={styles.statValue}>
                  {item.value}
                </Text>

                <Text style={styles.statLabel}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          {/* STEP 5 + BONUS 3: Reusable Tags */}
          <View style={styles.tags}>
            {SKILLS.map((skill) => (
              <Tag
                key={skill}
                label={skill}
                selected={selectedSkills.includes(skill)}
                onPress={() => handleSkillPress(skill)}
              />
            ))}
          </View>

          <Text style={styles.skillsHint}>
            Tap a skill to select it · {selectedSkills.length} selected
          </Text>

          {/* Action buttons */}
          <View style={styles.actions}>

            {/* Follow / Following */}
            <Pressable
              onPress={handleFollowPress}
              disabled={isBusy}
              style={({ pressed }) => [
                styles.button,
                isFollowing
                  ? styles.buttonFollowing
                  : styles.buttonPrimary,
                pressed && !isBusy && styles.pressed,
                isBusy && styles.buttonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  !isFollowing && styles.buttonTextPrimary,
                ]}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Pressable>

            {/* Message / Close */}
            <Pressable
              onPress={handleMessagePress}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonText}>
                {isComposerOpen ? 'Close' : 'Message'}
              </Text>
            </Pressable>

          </View>

          {/* STEP 4: Message composer */}
          {isComposerOpen && (
            <View style={styles.composer}>

              <TextInput
                style={styles.messageInput}
                placeholder="Write your message..."
                placeholderTextColor={COLORS.muted}
                value={message}
                onChangeText={handleMessageChange}
                maxLength={MAX_MESSAGE}
                multiline
              />

              <Text style={styles.messageCounter}>
                {message.length}/{MAX_MESSAGE}
              </Text>

              {/* BONUS 2: Error message */}
              {messageError !== '' && (
                <Text style={styles.errorText}>
                  {messageError}
                </Text>
              )}

              {/* Send button */}
              <Pressable
                onPress={handleSendPress}
                disabled={isSendDisabled}
                style={({ pressed }) => [
                  styles.sendButton,
                  isSendDisabled && styles.sendButtonDisabled,
                  pressed && !isSendDisabled && styles.pressed,
                ]}
              >
                <Text style={styles.sendButtonText}>
                  Send
                </Text>
              </Pressable>

            </View>
          )}

          {/* Share */}
          <View style={styles.shareWrapper}>
            <Button
              title="Share profile"
              color={COLORS.primary}
              onPress={handleSharePress}
            />
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  android: {
    elevation: 6,
  },
  default: {},
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  screenContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    ...cardShadow,
  },

  banner: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -44,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.card,
  },

  onlineBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.online,
    borderWidth: 3,
    borderColor: COLORS.card,
  },

  offlineBadge: {
    backgroundColor: COLORS.offline,
  },

  headerText: {
    flex: 1,
    marginLeft: 14,
    marginTop: 52,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },

  role: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },

  location: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },

  bio: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.text,
  },

  readMoreText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },

  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },

  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },

  statDivider: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },

  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },

  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  tagSelected: {
    backgroundColor: COLORS.primary,
  },

  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },

  tagTextSelected: {
    color: '#FFFFFF',
  },

  skillsHint: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },

  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },

  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },

  buttonFollowing: {
    backgroundColor: COLORS.primaryLight,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },

  buttonTextPrimary: {
    color: '#FFFFFF',
  },

  pressed: {
    opacity: 0.6,
  },

  composer: {
    marginTop: 16,
  },

  messageInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    minHeight: 90,
    color: COLORS.text,
    textAlignVertical: 'top',
  },

  messageCounter: {
    marginTop: 6,
    textAlign: 'right',
    fontSize: 12,
    color: COLORS.muted,
  },

  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.error,
  },

  sendButton: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  sendButtonDisabled: {
    opacity: 0.4,
  },

  sendButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  shareWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
});
