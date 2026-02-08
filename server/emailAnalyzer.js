function emailAnalyzer(emailText) {
  const topic = detectTopic(emailText);
  const intent = detectIntent(emailText);
  const summary = generateSummary(emailText, topic, intent);
  const category = categorizeEmail(emailText);
  const priority = determinePriority(emailText);
  const reply = generateReply(category, priority);

  return { summary, category, priority, reply };
}

// TOPIC DETECTION: Identifies what the email is about
function detectTopic(emailText) {
  const lowerText = emailText.toLowerCase();

  // Check for meeting coordination
  if (/\b(meeting|schedule|call|conference|discussion|sync|standup|zoom|teams|agenda)\b/.test(lowerText)) {
    return 'meeting coordination';
  }

  // Check for document submission/review
  if (/\b(document|submission|files|attachment|report|proposal|contract|draft|reviewed|approved?|signature?|sign)\b/.test(lowerText)) {
    return 'document submission and review';
  }

  // Check for deadline-related task
  if (/\b(deadline|urgent|asap|immediately|today|critical|priority|overdue)\b/.test(lowerText)) {
    return 'deadline-related task';
  }

  // Check for status update
  if (/\b(update|status|progress|completed|finished|accomplished|result|outcome)\b/.test(lowerText)) {
    return 'status update';
  }

  // Default topic
  return 'general communication';
}

// INTENT DETECTION: Identifies what the sender wants
function detectIntent(emailText) {
  const lowerText = emailText.toLowerCase();

  // Check for requesting review
  if (/\b(please review|kindly check|review|feedback|thoughts|opinion|look at|check|examine)\b/.test(lowerText)) {
    return 'requesting review';
  }

  // Check for sharing information
  if (/\b(just informing|for your information|fyi|please note|be aware|heads up|informational)\b/.test(lowerText)) {
    return 'sharing information';
  }

  // Check for requesting update/reminder
  if (/\b(reminder|follow up|update on|status of|any progress|where are we)\b/.test(lowerText)) {
    return 'requesting update';
  }

  // Check for seeking confirmation
  if (/\b(confirm|confirm|let me know|can you|please advise|awaiting|awaiting your|approval|agreement)\b/.test(lowerText)) {
    return 'seeking confirmation';
  }

  // Default intent
  return 'general request';
}

function generateSummary(emailText, topic, intent) {
  const summary = [];

  // Bullet point 1: What the email is about (topic)
  summary.push(`Email is about: ${topic}`);

  // Bullet point 2: What the sender wants (intent)
  summary.push(`Sender intent: ${intent}`);

  // Bullet point 3: Timeline or deadline
  const deadlineMatch = emailText.match(/\b(deadline|due by|submit by|due date)\s*[:=]*\s*([^,\n]+)/i);
  const timelineKeywords = /\b(today|tomorrow|this week|this month|immediately|asap|end of day|eod)\b/i.test(emailText);
  
  if (deadlineMatch && deadlineMatch[2]) {
    summary.push(`Timeline: ${deadlineMatch[2].trim()}`);
  } else if (timelineKeywords) {
    const timeMatch = emailText.match(/\b(today|tomorrow|this week|this month|immediately|asap|end of day|eod)\b/i);
    if (timeMatch) {
      summary.push(`Timeline: ${timeMatch[0]}`);
    } else {
      summary.push('Timeline: Requires prompt attention');
    }
  } else {
    summary.push('Timeline: No specific deadline mentioned');
  }

  // Bullet point 4: Inferred urgency
  const hasUrgencyMarker = /\b(urgent|asap|immediately|today|critical|priority|critical|overdue|deadline)\b/i.test(emailText);
  if (hasUrgencyMarker) {
    summary.push('Urgency inferred: High - marked with urgent or time-sensitive language');
  } else {
    summary.push('Urgency inferred: Standard - routine communication');
  }

  return summary;
}

function categorizeEmail(emailText) {
  if (/\b(urgent|asap|deadline|today|immediately|critical|priority)\b/i.test(emailText)) return 'Important';
  if (/\b(unsubscribe|promotion|offer)\b/i.test(emailText)) return 'Spam';
  if (/\b(follow up|reminder)\b/i.test(emailText)) return 'Follow-up';
  return 'Information';
}

function determinePriority(emailText) {
  if (/\b(today|immediately|tomorrow)\b/i.test(emailText)) return 'High';
  if (/\b(this week|soon)\b/i.test(emailText)) return 'Medium';
  return 'Low';
}

function generateReply(category, priority) {
  if (category === 'Important') {
    if (priority === 'High') {
      return 'Thank you for bringing this to our attention. We understand the urgency and have prioritized this matter. We will provide you with a comprehensive update within 24 hours and keep you informed of our progress.';
    } else if (priority === 'Medium') {
      return 'Thank you for your message. We acknowledge the importance of this request and have added it to our priority queue. We will address this within the week and follow up with you by end of business Friday.';
    } else {
      return 'Thank you for reaching out. We have received your request and will begin working on this shortly. We will keep you updated on the status and reach out if we need any additional information.';
    }
  }

  if (category === 'Follow-up') {
    return 'Thank you for the follow-up. We appreciate your reminder and will prioritize this accordingly. We will provide you with an update on the status of your request.';
  }

  if (category === 'Spam') {
    return 'No reply necessary.';
  }

  return 'Thank you for your email. We have received your message and will review it carefully. We will get back to you shortly with a response.';
}

export default emailAnalyzer;