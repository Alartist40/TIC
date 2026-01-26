# Sample Google Sheet Structure

This document provides the exact structure and sample data for each Google Sheet that needs to be created for the Tokyo International SDA Church website.

## **1. schedule-data Sheet**

**Purpose:** Service times and locations management
**Sheet Name:** `schedule-data`

### **Sheet Structure**
| A | B | C | D |
|---|---|---|---|
| **program** | **day_time** | **location** | **notes** |
| Sabbath School | Saturdays 9:00 – 10:30 | Assembly Hall (1F) | |
| Divine Service | Saturdays 10:30 – 12:00 | Assembly Hall (1F) | |
| Afternoon Program | Saturdays 14:00 – 16:00 | Assembly Hall (1F) | |
| Children's Afternoon Program | Saturdays 14:00 – 16:00 | Class Room (B1) | |
| Bible Studies (Children/Teens) | Saturdays 15:00 – 16:00 | Class Room (B1) | |
| Midweek Connection | Wednesdays 19:30 – 20:30 | Zoom 808-212-7314 | |
| Tagalog Bible Studies | Tuesdays/Thursdays 21:00 – 22:00 | Zoom 381-269-2541 | |
| Vespers | Fridays 19:30 – 20:30 | Zoom 808-212-7314 | |

### **Usage Notes**
- **program**: Service/program name (max 50 characters)
- **day_time**: Day and time format (e.g., "Saturdays 9:00 – 10:30")
- **location**: Physical location or Zoom link
- **notes**: Additional information (optional)
- **Color Coding:** The website will automatically apply colors based on program type:
  - Sabbath School: Blue (#005eb8)
  - Divine Service: Gold (#d4af37)
  - Midweek Connection: Green (#28a745)
  - Vespers: Purple (#6f42c1)
  - Default: Gray (#6c757d)

## **2. pastor-data Sheet**

**Purpose:** Pastor bio and family information
**Sheet Name:** `pastor-data`

### **Sheet Structure**
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| **pastor_name** | **pastor_title** | **pastor_bio** | **pastor_image** | **spouse_name** | **spouse_bio** | **favorite_verse** |
| Guenji Imayuki | Senior Pastor | Pastor Guenji Imayuki is a second-generation Japanese born in Brazil. He graduated with a degree in aeronautical engineering at ITA (Air Force Institute of Technology) and worked in the financial area for a few years. Despite the comfortable lifestyle, he reached a turning point in his career and understood that it was a call to ministry. He served as district pastor for 7 years in Brazil, the last one as the inter-conference district of Japanese churches. Then, he accepted a call to be director of Resident Foreigners Evangelism at JUC and Latino churches district, including Tokai Christian Center, Isesaki, Chiba Latino, and church planting project at Suwa. He enjoys digging deeper into the Word of God believing in its power to touch our hearts, as stated in his favorite Bible passage. | pastor_profile_pic.webp | Eliane Hosokawa Imayuki | Eliane Hosokawa Imayuki comes from a pastoral family and all her 3 siblings also serve the church. She graduated college of Letters at the most prestigious university in Brazil, USP, and besides teaching career at all levels of Seventh-day Adventist schools she authored Portuguese textbooks adopted nationwide by our denominational school network. She is still updating the textbooks remotely, but her current passion is to implement the center of influence model in our churches and is happy to have all four children living close now in Tokyo. | Isaiah 55:10-11 |

### **Usage Notes**
- **pastor_name**: Pastor's full name
- **pastor_title**: Official title (e.g., "Senior Pastor")
- **pastor_bio**: Professional biography (can include line breaks)
- **pastor_image**: Image filename (must be in images/pastor/ directory)
- **spouse_name**: Spouse's name
- **spouse_bio**: Spouse's biography
- **favorite_verse**: Favorite scripture reference

## **3. ministries-data Sheet**

**Purpose:** Ministry descriptions and details
**Sheet Name:** `ministries-data`

### **Sheet Structure**
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **ministry_name** | **ministry_description** | **ministry_details** | **ministry_image** | **sub_ministries** | **is_active** |
| Media Ministry | Transforming pixels into pulpits. Our media team brings the gospel into the digital age, live-streaming services to reach global audiences and creating content that inspires faith beyond our walls. Join us in harnessing technology for God's glory. | **Detailed Content:**<br><br>**Media Ministry Schedule:**<br>- Weekly: Live streaming setup (Saturdays 8:00-12:00)<br>- Weekly: Content creation (Wednesdays 19:00-21:00)<br>- Monthly: Video editing (Sundays 14:00-16:00)<br><br>**Volunteer Opportunities:**<br>- Camera operators<br>- Audio technicians<br>- Video editors<br>- Social media managers<br>- Website content creators<br><br>**Contact:** media@tokyoadventist.org | media-ministry.jpg | [{"name":"Youth Media","description":"Media training for teens","schedule":"Fridays 16:00-18:00","contact":"youthmedia@tokyoadventist.org"},{"name":"Technical Support","description":"AV equipment maintenance","schedule":"Saturdays 7:00-9:00","contact":"tech@tokyoadventist.org"}] | TRUE |
| Youth Ministry | More than a program—a revolution. We're empowering teens to own their faith through dynamic worship, authentic community, and mission experiences that turn belief into action. This is where faith gets real. | **Detailed Content:**<br><br>**Youth Ministry Schedule:**<br>- Weekly: Youth worship (Fridays 19:00-21:00)<br>- Monthly: Mission trips (varies)<br>- Weekly: Bible studies (Wednesdays 18:00-19:00)<br><br>**Programs:**<br>- Pathfinders (ages 10-14)<br>- Adventurers (ages 6-9)<br>- Children's Ministry (ages 3-5)<br><br>**Contact:** youth@tokyoadventist.org | youth-ministry.jpg | [{"name":"Pathfinders","description":"Adventure meets discipleship! Through camping, honors, and community service, we're building the next generation of Christian leaders.","schedule":"Saturdays 14:00-16:00","contact":"pathfinders@tokyoadventist.org"},{"name":"Adventurers","description":"Fun, faith, and friendship for young children through engaging activities and Bible learning.","schedule":"Saturdays 10:00-12:00","contact":"adventurers@tokyoadventist.org"}] | TRUE |
| Music Ministry | Your instrument, God's voice. Whether you sing or play, join a community where melodies become worship and talents become offerings. Help us create moments where heaven feels just a little closer. | **Detailed Content:**<br><br>**Music Ministry Schedule:**<br>- Weekly: Choir rehearsal (Thursdays 19:00-21:00)<br>- Weekly: Band practice (Tuesdays 18:00-20:00)<br>- Weekly: Worship team (Fridays 17:00-19:00)<br><br>**Opportunities:**<br>- Choir singers<br>- Instrumentalists<br>- Worship leaders<br>- Sound technicians<br>- Music arrangers<br><br>**Contact:** music@tokyoadventist.org | music-ministry.jpg | [{"name":"Choir","description":"Vocal worship team","schedule":"Thursdays 19:00-21:00","contact":"choir@tokyoadventist.org"},{"name":"Band","description":"Instrumental worship team","schedule":"Tuesdays 18:00-20:00","contact":"band@tokyoadventist.org"}] | TRUE |
| Health Ministry | Honoring God's temple—your body. We believe whole-person health is worship. Through cooking classes, fitness groups, and wellness seminars, we're building a healthier congregation from the inside out. | **Detailed Content:**<br><br>**Health Ministry Schedule:**<br>- Monthly: Cooking classes (1st Saturdays 13:00-15:00)<br>- Weekly: Fitness groups (Mondays 18:00-19:00)<br>- Monthly: Wellness seminars (3rd Wednesdays 19:00-21:00)<br><br>**Programs:**<br>- Nutrition workshops<br>- Exercise groups<br>- Mental health seminars<br>- Health screenings<br><br>**Contact:** health@tokyoadventist.org | health-ministry.jpg | [{"name":"Cooking Classes","description":"Healthy cooking workshops","schedule":"1st Saturdays 13:00-15:00","contact":"cooking@tokyoadventist.org"},{"name":"Fitness Group","description":"Exercise and wellness activities","schedule":"Mondays 18:00-19:00","contact":"fitness@tokyoadventist.org"}] | TRUE |

### **Usage Notes**
- **ministry_name**: Ministry name (max 30 characters)
- **ministry_description**: Short description for cards (max 150 characters)
- **ministry_details**: Detailed content for "Read More" modal (can include line breaks)
- **ministry_image**: Image filename (must be in images/ministries/ directory)
- **sub_ministries**: JSON array of sub-ministries (see format below)
- **is_active**: "TRUE" or "FALSE" to control visibility

### **Sub-ministries JSON Format**
```json
[
  {
    "name": "Pathfinders",
    "description": "Adventure meets discipleship! Through camping, honors, and community service, we're building the next generation of Christian leaders.",
    "schedule": "Saturdays 14:00-16:00",
    "contact": "pathfinders@tokyoadventist.org"
  }
]
```

## **4. bulletin-data Sheet**

**Purpose:** Weekly bulletin content
**Sheet Name:** `bulletin-data`

### **Sheet Structure**
| A | B | C | D |
|---|---|---|---|
| **bulletin_date** | **bulletin_title** | **bulletin_pdf_url** | **bulletin_summary** |
| 2024-01-06 | Weekly Bulletin - Jan 6 | https://drive.google.com/file/d/1aBcD.../view?usp=sharing | This week's announcements include the new year's service schedule, upcoming events, and special prayer requests. |
| 2024-01-13 | Weekly Bulletin - Jan 13 | https://drive.google.com/file/d/2eFgH.../view?usp=sharing | Weekly announcements, upcoming events calendar, and community updates. |
| 2024-01-20 | Weekly Bulletin - Jan 20 | https://drive.google.com/file/d/3iJkL.../view?usp=sharing | Special announcements for the monthly fellowship event and volunteer opportunities. |

### **Usage Notes**
- **bulletin_date**: Date in YYYY-MM-DD format
- **bulletin_title**: Bulletin title (max 50 characters)
- **bulletin_pdf_url**: Google Drive shareable link to PDF file
- **bulletin_summary**: Brief summary for modal content (max 200 characters)

## **Google Sheet Creation Guide**

### **1. Creating the Spreadsheet**
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Rename the spreadsheet to "TIC Church Website Content"
4. Create four sheets with the exact names:
   - `schedule-data`
   - `pastor-data`
   - `ministries-data`
   - `bulletin-data`

### **2. Setting Up Each Sheet**
1. Copy the exact column headers from above
2. Paste sample data (modify as needed)
3. Format columns:
   - **Text columns:** Left-aligned
   - **JSON columns:** Monospace font for sub-ministries
   - **Date columns:** Date format for bulletin_date

### **3. Sharing Settings**
1. Click "Share" button
2. Set to "Anyone with the link can view"
3. Copy the spreadsheet ID from the URL (between `/d/` and `/edit`)
4. Store this ID securely for the website configuration

### **4. Best Practices**
- **Consistency:** Use consistent formatting across all sheets
- **Validation:** Add data validation where appropriate
- **Backups:** Regularly export to CSV as backup
- **Version Control:** Use Google Sheets version history
- **Access Control:** Limit edit access to authorized staff only
- **Regular Updates:** Update content weekly/monthly as needed

### **5. Content Management Workflow**
1. **Content Creation:** Ministry leaders create content in Google Sheets
2. **Review:** Church administrator reviews and approves
3. **Publishing:** Changes appear on website within 1 hour (cache refresh)
4. **Backup:** Weekly backup of all sheets
5. **Training:** Regular training for content managers