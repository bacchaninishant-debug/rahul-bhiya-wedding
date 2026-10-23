/**
 * ==============================================================================
 * WEDDING INVITATION CONFIGURATION
 * ==============================================================================
 * Edit any detail here to customize the wedding invitation.
 * All sections (names, parents, dates, events, venue, map, RSVP) update automatically.
 */

window.WEDDING_CONFIG = {
  // Couple Details
  groom: {
    name: "Rajesh",
    alias: "Rahul",
    hindiName: "चि. राजेश (राहुल)",
    father: "श्री नरेश गुलवानी",
    mother: "श्रीमती दिव्या गुलवानी",
    familyCity: "जयपुर",
    initial: "R"
  },
  bride: {
    name: "Harsha",
    hindiName: "सौ. कां. हर्षा",
    father: "श्री अशोक पमनानी",
    mother: "श्रीमती मधु पमनानी",
    familyCity: "जयपुर",
    initial: "H"
  },

  // Blessings & Family Lineage
  blessings: {
    grandparents: "श्रीमती विशनी गुलवानी एवं स्व. श्री प्रेमचन्द गुलवानी",
    grandparentsEnglish: "Smt. Vishni Gulwani & Late Shri Premchand Gulwani",
    parentsGroom: "श्रीमती दिव्या गुलवानी एवं श्री नरेश गुलवानी",
    parentsBride: "श्रीमती मधु पमनानी एवं श्री अशोक पमनानी",
    solicitors: "समस्त गुलवानी एवं पमनानी परिवार",
    quoteHindi: "परमपिता परमेश्वर एवं पूज्य पूर्वजों के असीम आशीर्वाद से",
    quoteEnglish: "Two souls with but a single thought, two hearts that beat as one."
  },

  // Main Dates
  dates: {
    weddingStartDate: "2026-11-11",
    weddingTargetDateTime: "2026-11-11T11:00:00", // For Live Countdown
    displayDateEnglish: "11th & 12th November 2026",
    displayDateHindi: "11 एवं 12 नवम्बर 2026",
    fereMuhuratEnglish: "12th November 2026 • Auspicious Muhurat",
    fereMuhuratHindi: "12 नवम्बर 2026 • शुभलग्नानुसार"
  },

  // Venue Details
  venue: {
    nameEnglish: "Balaji Banquet Hall",
    nameHindi: "बालाजी बैंक्वेट हॉल",
    addressEnglish: "Muhana Mandi Road, Kesar Chauraha, Jaipur, Rajasthan",
    addressHindi: "मुहाना मण्डी रोड़, केसर चौराहा, जयपुर, राजस्थान",
    googleMapsUrl: "https://maps.google.com/?q=Balaji+Banquet+Hall+Muhana+Mandi+Road+Kesar+Chauraha+Jaipur",
    city: "Jaipur, Rajasthan"
  },

  // Event Schedule (Timeline matching printed cards)
  timeline: [
    {
      day: "Day 1",
      dateEnglish: "Wednesday, 11th November 2026",
      dateHindi: "बुधवार, 11 नवम्बर 2026",
      venueEnglish: "Balaji Banquet Hall, Muhana Mandi Road, Kesar Chauraha, Jaipur",
      venueHindi: "बालाजी बैंक्वेट हॉल, मुहाना मण्डी रोड़, केसर चौराहा, जयपुर",
      events: [
        {
          nameEnglish: "Swagat",
          nameHindi: "स्वागत",
          timeEnglish: "10:00 AM",
          timeHindi: "प्रातः 10.00 बजे",
          icon: "🌸",
          description: "Traditional welcome of guests & family."
        },
        {
          nameEnglish: "Behrana Sahib",
          nameHindi: "बहराणा साहिब",
          timeEnglish: "02:00 PM",
          timeHindi: "दोपहर 2.00 बजे",
          icon: "🪔",
          description: "Sacred Jhulelal bhajan & divine blessings."
        },
        {
          nameEnglish: "Ring Ceremony",
          nameHindi: "रिंग सेरेमनी",
          timeEnglish: "08:00 PM",
          timeHindi: "रात्रि 8.00 बजे",
          icon: "💍",
          description: "Exchange of rings & grand celebration."
        },
        {
          nameEnglish: "Preetibhoj",
          nameHindi: "प्रीतिभोज",
          timeEnglish: "08:00 PM",
          timeHindi: "रात्रि 8.00 बजे",
          icon: "🍲",
          description: "A grand feast celebrating the union."
        }
      ]
    },
    {
      day: "Day 2",
      dateEnglish: "Thursday, 12th November 2026",
      dateHindi: "गुरूवार, 12 नवम्बर 2026",
      venueEnglish: "Balaji Banquet Hall, Muhana Mandi Road, Kesar Chauraha, Jaipur",
      venueHindi: "बालाजी बैंक्वेट हॉल, मुहाना मण्डी रोड़, केसर चौराहा, जयपुर",
      events: [
        {
          nameEnglish: "Pallav",
          nameHindi: "पल्लव",
          timeEnglish: "10:00 AM",
          timeHindi: "प्रातः 10.00 बजे",
          icon: "🌿",
          description: "Auspicious prayers and beginning of rituals."
        },
        {
          nameEnglish: "Carnival",
          nameHindi: "कार्निवाल",
          timeEnglish: "11:00 AM",
          timeHindi: "प्रातः 11.00 बजे",
          icon: "🎉",
          description: "Joyful wedding carnival and festivities."
        },
        {
          nameEnglish: "Sath-Sog",
          nameHindi: "साठ-सोग",
          timeEnglish: "02:00 PM",
          timeHindi: "दोपहर 2.00 बजे",
          icon: "🍱",
          description: "Traditional feast and family gathering."
        },
        {
          nameEnglish: "Dikh",
          nameHindi: "दिख",
          timeEnglish: "05:00 PM",
          timeHindi: "सायं 5.00 बजे",
          icon: "🌼",
          description: "Traditional Dikh ceremony with music & shagun."
        },
        {
          nameEnglish: "Baraat Nikasi",
          nameHindi: "बारात निकासी",
          timeEnglish: "06:00 PM",
          timeHindi: "सायं 6.00 बजे",
          icon: "🥁",
          description: "Royal groom's procession with dhol & dance."
        },
        {
          nameEnglish: "Dinner",
          nameHindi: "डिनर",
          timeEnglish: "08:00 PM",
          timeHindi: "रात्रि 8.00 बजे",
          icon: "🍛",
          description: "Royal banquet for all esteemed guests."
        },
        {
          nameEnglish: "Panigrahan Sanskar",
          nameHindi: "पाणिग्रहण संस्कार",
          timeEnglish: "Auspicious Muhurat",
          timeHindi: "शुभलग्नानुसार",
          icon: "🔥",
          description: "Sacred seven pheras around the holy fire."
        }
      ]
    }
  ],

  // Music & Assets
  assets: {
    audioUrl: "assets/wedding_music.wav",
    doorwayBg: "assets/doorway_bg.jpg",
    coupleLakeBg: "assets/couple_lake_bg.jpg",
    ceremonyBg: "assets/ceremony_bg.jpg",
    ganeshaCard: "assets/ganesha_card.jpg"
  },

  // WhatsApp Share Message Text
  share: {
    title: "Wedding Invitation - Rajesh & Harsha",
    url: "https://5b65763c0d99cd.lhr.life",
    message: "🌸 *Wedding Invitation* 🌸\n\n॥ श्री गणेशाय नमः ॥\n\nपरमपिता परमेश्वर व पूज्य बड़ों के आशीर्वाद से हमारे शुभ विवाह में आपकी स्नेहमयी उपस्थिति प्रार्थनीय है।\n\n💍 *Rajesh (Rahul)* ❤️ *Harsha*\n🗓 *तारीख:* 11 एवं 12 नवम्बर 2026\n📍 *वेन्यू:* बालाजी बैंक्वेट हॉल, मुहाना मण्डी रोड़, केसर चौराहा, जयपुर\n\n✨ हमारा डिजिटल एनिमेटेड कार्ड (म्यूजिक व 3D एनीमेशन के साथ) देखने के लिए यहाँ टच करें:\nhttps://5b65763c0d99cd.lhr.life"
  }
};

