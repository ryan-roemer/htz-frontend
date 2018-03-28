const mocks = {
  CommentsElement: () => ({
    comments: [
      {
        commentId: '19.1676',
        author: 'גכנגכנ',
        title: '',
        commentText: 'כגנגכנ\n<b>כגנגכנ<i>כגנגכנ</i></b>',
        publishingDateForDisplay: '11:48 06.02.2018',
        publishingDateSortable: '20180206114830',
        isEditorPick: 'false',
        subComments: null,
      },
      {
        commentId: '19.1614',
        author: 'מתן',
        title: 'מתקפות סייבר',
        commentText:
          "בשנים האחרונות אנחנו שומעים שוב ושוב על מתקפות סייבר באמצעות תוכנות זדוניות, התקני USB נגועים ופישינג ממוקד באמצעות אימיילים, אבל אלה רחוקים מלהיות ערוצי התקיפה היחידים, כפי שהדגימו חוקרים מאוניברסיטת תל אביב והטכניון לאחרונה. המחקר של ד&quot;ר ערן טרומר ואיתמר פיפמן מאוניברסיטת תל אביב ודניאל גנקין מהטכניון ואונ' ת&quot;א, מגלה שעם הציוד והתוכנה הנכונים, בצירוף האלגוריתמים המתאימים, לפעמים כל מה שצריך לעשות הוא להניח את היד על המחשב של הקורבן, כאילו בהיסח הדעת, לכמה שניות כדי לחשוף את מפתחות ההצפנה שלו.",
        publishingDateForDisplay: '12:19 29.09.2016',
        publishingDateSortable: '20160929121923',
        isEditorPick: 'false',
        subComments: null,
      },
    ],
    commentsPlusRate: {
      19.1614: 25,
    },
    commentsMinusRate: {
      19.1614: 5,
    },
    totalHits: 2,
  }),

  addComment: () => ({
    newCommentId: '12345',
    hash: 'abcde',
  }),

  Footer: () => ({
    head: [
      { text: 'מערכת', href: 'https://www.haaretz.co.il/misc/editors', },
      { text: 'הנהלה', href: 'https://www.haaretz.co.il/misc/management', },
      { text: 'אודות הארץ', href: 'https://www.haaretz.co.il/misc/about-haaretz', },
      { text: 'דרושים', href: 'https://www.haaretz.co.il/misc/jobs', },
      { text: 'צור קשר', href: 'https://www.haaretz.co.il/misc/contact-us', },
      { text: 'עשה מנוי', href: 'https://www.haaretz.co.il/promotions-page', },
      { text: 'ביטול מנוי דיגיטלי', href: 'https://www.haaretz.co.il/misc/contact-us', },
      { text: 'שאלות ותשובות', href: 'https://www.haaretz.co.il/misc/faq', },
      {
        text: 'פרסם אצלנו',
        href: 'https://www.haaretz.co.il/st/c/prod/global/mediaKit/haaretzHeb.html',
      },
    ],
    columns: [
      {
        title: 'מדורים',
        combineWithNextColumn: true,
        items: [
          {
            text: 'חדשות',
            href: 'https://www.haaretz.co.il/news',
          },
          {
            text: 'סרטים מומלצים',
            href: 'https://www.haaretz.co.il/misc/tags/movies-1.1653396',
          },
          {
            text: 'מזג אוויר',
            href: 'https://www.haaretz.co.il/news/weather',
          },
          {
            text: 'ספורט',
            href: 'https://www.haaretz.co.il/sport',
          },
          {
            text: 'פורים 2018',
            href: 'https://www.haaretz.co.il/gallery/purim',
          },
          {
            text: 'תחרות הסיפור הקצר',
            href: 'https://www.haaretz.co.il/short-story/1.5727927',
          },
        ],
      },
      {
        title: 'Haaretz.com',
        combineWithNextColumn: false,
        items: [
          {
            text: 'Israel - Syria rebels',
            href:
              'https://www.haaretz.com/israel-news/with-eye-on-iran-israel-increases-military-support-for-syrian-rebels-1.5826348',
          },
          {
            text: 'Freemasons',
            href:
              'https://www.haaretz.com/israel-news/MAGAZINE-not-a-cult-the-freemasons-want-you-unless-you-you-1.5824127',
          },
          {
            text: 'Kurds - Syria',
            href:
              'https://www.haaretz.com/middle-east-news/syria/.premium-with-nowhere-else-to-turn-syrian-kurds-will-have-to-embrace-assad-1.5828926',
          },
          {
            text: 'Netanyahu graft',
            href:
              'https://www.haaretz.com/israel-news/nix-sara-netanyahu-case-get-top-post-pm-s-confidant-offered-judge-1.5832137',
          },
          {
            text: 'Israel news',
            href: 'https://www.haaretz.com/israel-news',
          },
          {
            text: 'Middle East',
            href: 'https://www.haaretz.com/middle-east-news',
          },
          {
            text: 'Travel in Israel',
            href: 'https://www.haaretz.com/israel-news/travel',
          },
          {
            text: 'Jewish World',
            href: 'https://www.haaretz.com/jewish',
          },
          {
            text: 'Shabbat Times',
            href: 'https://www.haaretz.com/misc/shabbat-times',
          },
        ],
      },
      {
        title: 'כלים שימושיים',
        combineWithNextColumn: false,
        items: [
          {
            text: 'המייל האדום',
            href: 'https://www.haaretz.co.il/misc/redemail',
          },
          {
            text: 'מדיניות פרטיות',
            href: 'https://www.haaretz.co.il/misc/privacy-policy',
          },
          {
            text: 'חלון מבזקים',
            href: 'https://www.haaretz.co.il/misc/widget',
          },
          {
            text: 'ארכיון הארץ',
            href: 'https://www.haaretz.co.il/misc/1.767350',
          },
          {
            text: 'דיוור הארץ',
            href: 'https://www.haaretz.co.il/personal-area/newsletter',
          },
          {
            text: 'כל כותרות היום',
            href: 'https://www.haaretz.co.il/misc/all-headlines',
          },
          {
            text: 'צור קשר',
            href: 'https://www.haaretz.co.il/misc/contact-us',
          },
          {
            text: 'מודעות אבל',
            href: 'https://www.haaretz.co.il/misc/1.2768082',
          },
          {
            text: 'תנאי שימוש',
            href: 'https://www.haaretz.co.il/misc/terms-of-use',
          },
          {
            text: 'מינוי הארץ',
            href: 'https://www.haaretz.co.il/promotions-page',
          },
          {
            text: 'מינוי לעיתון',
            href: 'https://www.haaretz.co.il/misc/menuim',
          },
          {
            text: 'כנסים',
            href: 'http://conferences.themarker.com/',
          },
          {
            text: 'נגישות',
            href: 'https://www.haaretz.co.il/misc/accessibility',
          },
        ],
      },
      {
        title: 'עכבר העיר',
        combineWithNextColumn: false,
        items: [
          {
            text: 'פורים 2018',
            href: 'https://www.haaretz.co.il/gallery/purim',
          },
          {
            text: 'תחפושות לפורים לילדים',
            href: 'https://www.haaretz.co.il/gallery/purim/1.3156076',
          },
          {
            text: 'תחפושות לתינוקות',
            href: 'https://www.haaretz.co.il/gallery/purim/1.3155900',
          },
          {
            text: 'מתכונים לאוזני המן',
            href: 'https://www.haaretz.co.il/food/1.3156002',
          },
          {
            text: 'תהלוכות עדלאידע בפורים',
            href: 'https://www.haaretz.co.il/gallery/purim/1.3155908',
          },
          {
            text: 'מסיבות פורים',
            href: 'https://www.haaretz.co.il/gallery/night-life/1.3155822',
          },
        ],
      },
      {
        title: 'TheMarker',
        combineWithNextColumn: true,
        items: [
          {
            text: 'שוק ההון',
            href: 'https://www.themarker.com/markets',
          },
          {
            text: 'חדשות',
            href: 'https://www.themarker.com/allnews',
          },
          {
            text: 'גלובל',
            href: 'https://www.themarker.com/wallstreet',
          },
          {
            text: 'נדל"ן',
            href: 'https://www.themarker.com/realestate',
          },
          {
            text: 'TechNation',
            href: 'https://www.themarker.com/technation',
          },
          {
            text: 'MarkerWeek',
            href: 'https://www.themarker.com/markerweek',
          },
        ],
      },
      {
        title: 'Finance',
        combineWithNextColumn: false,
        items: [
          {
            text: 'ת"א 35',
            href: 'http://finance.themarker.com/home/?type=1&documentId=142',
          },
          {
            text: 'ת"א 125',
            href: 'http://finance.themarker.com/home/?type=1&documentId=137',
          },
          {
            text: 'מניית טבע',
            href: 'http://finance.themarker.com/quote/?mador=1&documentId=629014',
          },
          {
            text: 'מניית בזק',
            href: 'http://finance.themarker.com/quote/?mador=1&documentId=230011',
          },
        ],
      },
      {
        title: 'שיתופי פעולה',
        combineWithNextColumn: false,
        items: [
          {
            text: 'פגסוס טיולים',
            href: 'https://www.haaretz.co.il/labels/pegasus',
          },
          {
            text: 'בית אבי חי',
            href: 'https://www.haaretz.co.il/labels/avi-chai',
          },
          {
            text: 'השקעות נדל"ן בחו"ל',
            href: 'https://www.themarker.com/labels/iintoo',
          },
          {
            text: 'ויטרינה',
            href: 'https://www.vitrina.co.il/',
          },
          {
            text: 'SUPERMARKER – צרכנות פיננסית',
            href: 'https://supermarker.themarker.com/',
          },
          {
            text: 'אופנה',
            href: 'https://www.onlife.co.il/category/fashion',
          },
        ],
      },
    ],
    credit: [ { text: 'מערכת', href: 'https://www.haaretz.co.il/misc/editors', }, ],
    toolbox: [
      { text: 'חיבור מינוי דיגיטלי', href: 'https://www.haaretz.co.il/misc/entitlement', },
      { text: 'עדכונים במייל', href: 'https://www.haaretz.co.il/personal-area/newsletter', },
      { text: 'קנה מינוי דיגיטלי', href: 'https://www.haaretz.co.il/promotions-page', },
      {
        text: 'קנה מינוי לעיתון',
        href:
          'https://secure.pulseem.com/clientpages/07092017151238sa6045.html?v=89a6c973-41b3-4181-811c-a459ac50164e_',
      },
      {
        text: 'פרסם אצלנו',
        href: 'https://www.haaretz.co.il/st/c/prod/global/mediaKit/haaretzHeb.html',
      },
      { text: 'לפרסום בעיתון', href: 'mailto: moshem@haaretz.co.il', },
      { text: 'שירות למנויים', href: 'https://www.haaretz.co.il/personal-area/my-account', },
    ],
  }),

  List: () => ({
    title: 'הונג קונג',
    items: [
      {
        image: {
          accessibility: 'putin',
          title: 'ולדימיר פוטין',
          aspects: {
            full: {
              width: 1304,
              height: 900,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/3337826422.jpg',
              version: '1502966590',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.2162',
          contentName: 'ולדימיר פוטין',
        },
        firstParagraph:
          '<p>בכל עיר עם תרבות קלאבינג יש את המקום בו הכל החל: לניו יורק יש את &quot;סטודיו 54&quot;, לאמסטרדם את מועדון &quot;ניקס&quot; ולתל אביב יש את &quot;אלנבי 58&quot;. לאחר זמן ממושך שבו עמד המקום נטוש, כ–17 שנים מאז השתרך שם התור בפעם האחרונה — נהרס אמש המבנה של המועדון ה...</p>',
        publishDate: 1501161609002,
        contentId: '1.5768',
        exclusiveMobile: 'דגכדגשכ',
        title: 'שדכשדגכ',
        commentsCounts: 0,
        path: '/1.5768',
        subtitleMobile: 'שדגכשדגכשדגכ',
        isPremiumContent: false,
        subtitle: 'שדגכשדגכשדגכ',
        lastUpdate: 1501161609002,
        mediaFlags: {
          video: true,
        },
        exclusive: 'דגכדגשכ',
        titleMobile: 'שדכשדגכ',
        hash: 'B1FCB0226A3B65597F0C6A3E12E7B95C',
        authors: [ 'דשגשדג', ],
      },
      {
        image: {
          accessibility: 'דוד לוי',
          credit: 'Credit',
          aspects: {
            full: {
              width: 470,
              height: 313,
            },
            headline: {
              x: 0,
              y: 40,
              width: 470,
              height: 273,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/1365043816.jpg',
              version: '1520779792',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.2359',
          contentName: 'דוד לוי',
        },
        firstParagraph: '<p>89u</p...</p>',
        publishDate: 1501158782370,
        contentId: '1.5764',
        title: 'ouujh9',
        commentsCounts: 0,
        path: '/1.5764',
        subtitleMobile: 'u890u90',
        isPremiumContent: false,
        subtitle: 'u890u90',
        lastUpdate: 1501158782370,
        mediaFlags: {
          video: true,
        },
        authorImage: {
          viewMode: 'FullColumnWithVerticalImage',
          accessibility: 'אליה גריידי',
          aspects: {
            full: {
              width: 960,
              height: 720,
            },
            square: {
              x: 76,
              y: 25,
              width: 613,
              height: 613,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/4022571789.jpg',
              version: '1502966856',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.2433',
          contentName: 'אליה גריידי',
        },
        titleMobile: 'ouujh9',
        hash: '1D08772F232E57F7BA6DF73E444BFFCA',
        authors: [
          {
            image: {
              viewMode: 'FullColumnWithVerticalImage',
              accessibility: 'אליה גריידי',
              aspects: {
                full: {
                  width: 960,
                  height: 720,
                },
                square: {
                  x: 76,
                  y: 25,
                  width: 613,
                  height: 613,
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/4022571789.jpg',
                  version: '1502966856',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.2433',
              contentName: 'אליה גריידי',
            },
            inputTemplate: 'com.tm.Author',
            contentId: '1.2432',
            contentName: 'אליה גריידי',
          },
        ],
      },
      {
        image: {
          accessibility: 'obama',
          aspects: {
            full: {
              width: 2200,
              height: 1468,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/3447786819.jpg',
              version: '1502965886',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.1228',
          contentName: 'Obama',
        },
        firstParagraph:
          '<p>גרגגמל לביטחון לאומי בארה&quot;ב גיבשו תוכנית למתקפת סייבר מתוחכמת נגד הצבא הסורי ושרשרת הפיקוד של הנשיא באשר אסד. המתכננים שמו דגש על פגיעה ביכולת של הצבא לשגר מתקפות אוויריות ועל מתקנים לייצור טילים. </p> <p>&quot;המטרה היתה למעשה לכבות לאסד את האורות&quot;, אמר פ...</p>',
        publishDate: 1451566482804,
        contentId: '7.2074',
        exclusiveMobile: 'מתן בסתר',
        leadText:
          'השמחה לאיד היא תכונה שמשותפת לרבים ויש בה כדי להצביע על עליבותם ומידת קינאתם',
        title: 'מקומות בארץ שבהם תקבלו דונם קרקע בחינם לבנות בית',
        commentsCounts: 71,
        path: '/.premium-1.1204',
        subtitleMobile:
          'קרקע של דונם לבנות את וילת חלומותיכם לצד קיצור תהליכים בירוקרטיים ומענקים למימון הבית והעסק: הצצה למקומות בישראל שבהם זה קורה ובישראלים שכבר עשו זאת',
        relatedArticles: [
          {
            firstParagraph:
              '<p>רשת טלוויזיה איראנית פרסמה היום (ראשון) תצלומים של המל&quot;ט הישראלי, שיורט לטענת איראן בימים האחרונים מעל המתקן הגרעיני בנתאנז. לפי הדיווח, מדובר בכלי טיס&nbsp;מסוג הרמס שיוצר בישראל. גם מומחה נשק וכלי טיס שבחן את התמונות אמר ל&quot;הארץ&quot; כי נראה שמדובר בכלי ט...</p>',
            publishDate: 1453990683374,
            contentId: '1.2092',
            title: 'איראן פרסמה תמונות של המל"ט הישראלי שלטענתה יירטה',
            commentsCounts: 0,
            path: '/1.2092',
            subtitleMobile:
              'לטענת האיראנים, מדובר במל"ט מסוגר הרמס שהופל מעל מתקן הגרעין בנתאנז. מומחה נשק ל"הארץ": זה נראה מל"ט מתוצרת ישראל',
            isPremiumContent: false,
            subtitle:
              'לטענת האיראנים, מדובר במל"ט מסוגר הרמס שהופל מעל מתקן הגרעין בנתאנז. מומחה נשק ל"הארץ": זה נראה מל"ט מתוצרת ישראל',
            lastUpdate: 1453990682027,
            mediaFlags: {},
            authorImage: {
              viewMode: 'FullColumnWithVerticalImage',
              aspects: {
                full: {
                  width: 148,
                  height: 225,
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/487790403.png',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.1937',
              contentName: 'משה בן עטר-צרובה',
            },
            titleMobile: 'איראן פרסמה תמונות של המל"ט הישראלי שלטענתה יירטה',
            hash: '2AFE93E4B60BE18ACD0676CC0C89D909',
            authors: [
              {
                image: {
                  viewMode: 'FullColumnWithVerticalImage',
                  aspects: {
                    full: {
                      width: 148,
                      height: 225,
                    },
                  },
                  isAnimated: false,
                  imgArray: [
                    {
                      imgName: 'image/487790403.png',
                    },
                  ],
                  imageType: 'image',
                  inputTemplate: 'com.tm.Image',
                  contentId: '1.1937',
                  contentName: 'משה בן עטר-צרובה',
                },
                inputTemplate: 'com.tm.Author',
                contentId: '1.1424',
                contentName: 'משה בן עטר',
              },
            ],
          },
        ],
        isPremiumContent: true,
        subtitle:
          'קרקע של דונם לבנות את וילת חלומותיכם לצד קיצור תהליכים בירוקרטיים ומענקים למימון הבית והעסק: הצצה למקומות בישראל שבהם זה קורה ובישראלים שכבר עשו זאת',
        lastUpdate: 1451566484146,
        mediaFlags: {
          video: true,
          html_embed: true,
          gallery: true,
        },
        authorImage: {
          viewMode: 'FullColumnWithVerticalImage',
          accessibility: 'ארי שביט',
          title: 'ארי שביט',
          aspects: {
            full: {
              width: 300,
              height: 201,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/1590764374.png',
              version: '1508848533',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.1474',
          contentName: 'ארי שביט',
        },
        exclusive: 'מתן בסתר',
        titleMobile: 'מקומות בארץ שבהם תקבלו דונם קרקע בחינם לבנות בית',
        hash: 'C12826A1D298483C2B8E5745A40BE92F',
        authors: [
          {
            image: {
              viewMode: 'FullColumnWithVerticalImage',
              accessibility: 'ארי שביט',
              title: 'ארי שביט',
              aspects: {
                full: {
                  width: 300,
                  height: 201,
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/1590764374.png',
                  version: '1508848533',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.1474',
              contentName: 'ארי שביט',
            },
            inputTemplate: 'com.tm.Author',
            contentId: '1.1473',
            contentName: 'ארי שביט',
          },
        ],
        reportingFrom: 'יונתן',
      },
      {
        image: {
          accessibility: 'מסעדת צארום ',
          title: 'מסעדת צארום',
          aspects: {
            full: {
              width: 300,
              height: 175,
            },
            square: {
              x: 30,
              y: 0,
              width: 175,
              height: 175,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/3195964184.jpg',
              version: '1508254402',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '7.3133',
          contentName: 'מסעדת צארום',
        },
        firstParagraph:
          '<p>הכנת הלזניה האמיתית היא, בדרך כלל, מעשה מרכבה די מפרך. המתכון שלפניכם מנצל בלי בושה את עלי הלזניה האיטלקיים שאין צורך לבשלם מראש, ועוד כל מיני מוצרים מוכנים המונעים בישול מסובך מדי של הרוטב ו/או המלית. מכאן יוצא שהכנת הלזניה הזאת קלה יותר מהכנת פסטה. אין שום רכיב של ...</p>',
        publishDate: 1502131400142,
        contentId: '1.5808',
        title: 'הלזניה הכי קלה בעולם',
        commentsCounts: 0,
        path: '/RECIPE-1.5808',
        subtitleMobile:
          'הכנת לזניה אמיתית כרוכה בדרך כלל בעבודה מפרכת. המתכון שלפניכם מנצל בלי בושה את עלי הלזניה האיטלקיים המוכנים, שאין צורך לבשלם מראש',
        isPremiumContent: false,
        subtitle:
          'הכנת לזניה אמיתית כרוכה בדרך כלל בעבודה מפרכת. המתכון שלפניכם מנצל בלי בושה את עלי הלזניה האיטלקיים המוכנים, שאין צורך לבשלם מראש',
        lastUpdate: 1502131400150,
        mediaFlags: {
          video: true,
        },
        authorImage: {
          viewMode: 'FullColumnWithVerticalImage',
          accessibility: 'רמי ליבני-צרובה',
          aspects: {
            full: {
              width: 500,
              height: 599,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/2629112761.png',
              version: '1519823239',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.1749',
          contentName: 'רמי ליבני-צרובה',
        },
        titleMobile: 'הלזניה הכי קלה בעולם',
        hash: '68038AF9B293DC6E84F18EDD23B534D0',
        authors: [
          {
            image: {
              viewMode: 'FullColumnWithVerticalImage',
              accessibility: 'רמי ליבני-צרובה',
              aspects: {
                full: {
                  width: 500,
                  height: 599,
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/2629112761.png',
                  version: '1519823239',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.1749',
              contentName: 'רמי ליבני-צרובה',
            },
            inputTemplate: 'com.tm.Author',
            contentId: '1.1748',
            contentName: 'רמי ליבני',
          },
          'נירה רוסו',
        ],
      },
      {
        image: {
          accessibility: 'Haaretz',
          aspects: {
            full: {
              width: 800,
              height: 343,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/1646585932.gif',
              version: '1521717860',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.444',
          contentName: 'Haaretz',
        },
        publishDate: 1502181633095,
        contentId: '1.5814',
        title: 'אמבדים כתבה ביקורת - הארץ',
        commentsCounts: 0,
        path: '/premium-REVIEW-1.5814',
        subtitleMobile: 'אמבדים כתבה ביקורת - הארץ',
        relatedArticles: [
          {
            image: {
              accessibility: 'גיסלה מוטה בטקס השבעתה, ביום שישי',
              credit: 'רויטרס',
              title: 'גיסלה מוטה בטקס השבעתה, ביום שישי',
              aspects: {
                full: {
                  width: 2200,
                  height: 1489,
                },
                headline: {
                  x: 113,
                  y: 153,
                  width: 2015,
                  height: 1171,
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/1381338611.jpg',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.2381',
              contentName: 'גיסלה מוטה בטקס השבעתה, ביום שישי',
            },
            firstParagraph:
              '<p>ראשת עיר במקסיקו נורתה למוות אתמול (שבת), פחות מיממה אחרי שנכנסה לתפקיד. כך הודיעו בכירים במדינה. חמושים ירו לעבר ראשת העיר, גיסלה מוטה, בביתה בעיר טמיקסקו שבמדינת המחוז מוראלוס מדרום לבירה ניו מקסיקו.</p> <p>לדברי האחראי על הביטחון במוראלוס, חסוס אלברטו קפלה, שניים...</p>',
            publishDate: 1453990725967,
            contentId: '1.2300',
            title:
              'ראשת עיר במקסיקו נורתה למוות, פחות מיממה אחרי שהושבעה לתפקיד',
            commentsCounts: 0,
            path: '/1.2300',
            subtitleMobile:
              'חמושים ירו למוות בראשת העיר טמיקסקו, גיסלה מוטה, בביתה ונמלטו. שניים מהם נהרגו ושלושה אחרים נעצרו בתום מרדף. לדברי הרשויות מאחורי הרצח עומד הפשע המאורגן שמוטה נשבעה להילחם בו',
            isPremiumContent: false,
            subtitle:
              'חמושים ירו למוות בראשת העיר טמיקסקו, גיסלה מוטה, בביתה ונמלטו. שניים מהם נהרגו ושלושה אחרים נעצרו בתום מרדף. לדברי הרשויות מאחורי הרצח עומד הפשע המאורגן שמוטה נשבעה להילחם בו',
            lastUpdate: 1453990727070,
            mediaFlags: {},
            titleMobile:
              'ראשת עיר במקסיקו נורתה למוות, פחות מיממה אחרי שהושבעה לתפקיד',
            hash: '16A78CCDA7A0A90EFED15F612DCACD52',
            authors: [ 'אי-פי', ],
          },
          {
            image: {
              accessibility: 'ניסוי הטילים כפי שנראה משדה תעופה בקליפורניה',
              credit: 'ערוץ היוטיוב Cloud19',
              title: 'ניסוי הטילים כפי שנראה משדה תעופה בקליפורניה',
              aspects: {
                full: {
                  width: 864,
                  height: 782,
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/4083464421.jpg',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.2342',
              contentName: 'ניסוי טילים קליפורניה',
            },
            firstParagraph:
              '<p>אור בוהק מסתורי ואחריו שובל ארוך ובהיר נצפה הלילה (ראשון) חוצה במהירות את שמי דרום קליפורניה. תושבים רבים שהבחינו במראה המוזר, שנצפה גם באריזונה ובנוואדה, מיהרו לשאול שאלות ולפרסם סרטונים ברשתות החברתיות, כשחלקם טוענים שמדובר בעב&quot;מ. מוקדי החירום והשיטור הוצפו בש...</p>',
            publishDate: 1456219424639,
            contentId: '1.2341',
            title:
              'ניסוי טילים לילי מרהיב האיר את שמי קליפורניה, אך התושבים נלחצו',
            commentsCounts: 0,
            path: '/1.2341',
            subtitleMobile:
              'בדרום קליפורניה, אריזונה ונוואדה הבחינו רבים באור בוהק ומסתורי חוצה את השמיים במהירות גבוהה תוך שהוא מותיר אחריו שובל. מוקדי החירום וההצלה הוצפו בדיווחים נרגשים על עב"מ',
            isPremiumContent: false,
            subtitle:
              'בדרום קליפורניה, אריזונה ונוואדה הבחינו רבים באור בוהק ומסתורי חוצה את השמיים במהירות גבוהה תוך שהוא מותיר אחריו שובל. מוקדי החירום וההצלה הוצפו בדיווחים נרגשים על עב"מ',
            lastUpdate: 1456219426661,
            mediaFlags: {},
            authorImage: {
              viewMode: 'FullColumnWithVerticalImage',
              aspects: {
                full: {
                  width: 468,
                  height: 468,
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/3578024672.png',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.1888',
              contentName: 'יגאל קיפניס',
            },
            titleMobile:
              'ניסוי טילים לילי מרהיב האיר את שמי קליפורניה, אך התושבים נלחצו',
            hash: '51F3A8DF1D9BD1AC638A42E257653AAC',
            authors: [
              {
                image: {
                  viewMode: 'FullColumnWithVerticalImage',
                  aspects: {
                    full: {
                      width: 468,
                      height: 468,
                    },
                  },
                  isAnimated: false,
                  imgArray: [
                    {
                      imgName: 'image/3578024672.png',
                    },
                  ],
                  imageType: 'image',
                  inputTemplate: 'com.tm.Image',
                  contentId: '1.1888',
                  contentName: 'יגאל קיפניס',
                },
                inputTemplate: 'com.tm.Author',
                contentId: '1.1736',
                contentName: 'יגאל קיפניס',
              },
            ],
          },
        ],
        isPremiumContent: true,
        subtitle: 'אמבדים כתבה ביקורת - הארץ',
        lastUpdate: 1502181633095,
        mediaFlags: {
          video: true,
        },
        authorImage: {
          viewMode: 'FullColumnWithVerticalImage',
          accessibility: 'אליה גריידי',
          aspects: {
            full: {
              width: 960,
              height: 720,
            },
            square: {
              x: 76,
              y: 25,
              width: 613,
              height: 613,
            },
          },
          isAnimated: false,
          imgArray: [
            {
              imgName: 'image/4022571789.jpg',
              version: '1502966856',
            },
          ],
          imageType: 'image',
          inputTemplate: 'com.tm.Image',
          contentId: '1.2433',
          contentName: 'אליה גריידי',
        },
        titleMobile: 'אמבדים כתבה ביקורת - הארץ',
        hash: 'A5F9A052D4EBB2EC3CA611BE261C5F2F',
        authors: [
          {
            image: {
              viewMode: 'FullColumnWithVerticalImage',
              accessibility: 'אליה גריידי',
              aspects: {
                full: {
                  width: 960,
                  height: 720,
                },
                square: {
                  x: 76,
                  y: 25,
                  width: 613,
                  height: 613,
                },
              },
              isAnimated: false,
              imgArray: [
                {
                  imgName: 'image/4022571789.jpg',
                  version: '1502966856',
                },
              ],
              imageType: 'image',
              inputTemplate: 'com.tm.Image',
              contentId: '1.2433',
              contentName: 'אליה גריידי',
            },
            inputTemplate: 'com.tm.Author',
            contentId: '1.2432',
            contentName: 'אליה גריידי',
          },
        ],
      },
    ],
    hasPagination: false,
    inputTemplate: 'com.tm.element.List',
    contentId: '7.7474',
    contentName: 'הונג קונג',
  }),
};

export default mocks;
