export const lessons = [
  {
    id: 1,
    title: "Making Characters Move",
    concept: "Today, we'll learn how to make our character move! We will use Event blocks to start an action and Motion blocks to create movement.",
    tasks: [
      {
        id: 1,
        instruction: "First, find the 'when green flag clicked' block in the Events category and drag it into the workspace on the right.",
        blockType: "event_whenflagclicked",
        category: "Events",
        blockImage: "/blocks/when-flag-clicked.png",
        hint: "Look for the green flag icon in the Events section!"
      },
      {
        id: 2,
        instruction: "Great! Now, find the 'move 10 steps' block in the Motion category and connect it below the first block.",
        blockType: "motion_movesteps",
        category: "Motion",
        blockImage: "/blocks/move-steps.png",
        hint: "Motion blocks are blue and control how sprites move around."
      },
      {
        id: 3,
        instruction: "Perfect! Click the green flag above the stage to see your character move!",
        blockType: "complete",
        category: "Control",
        blockImage: "/blocks/green-flag.png",
        hint: "The green flag runs your code - just like pressing play!"
      }
    ],
    toolboxCategories: ["Events", "Motion"],
    sprite: {
      name: "Nexie",
      image: "/sprites/nexie-cat.png",
      startPosition: { x: 0, y: 0 }
    },
    expectedBlocks: [
      {
        type: "event_whenflagclicked",
        next: {
          type: "motion_movesteps",
          fields: {
            STEPS: 10
          }
        }
      }
    ]
  },
  {
    id: 2,
    title: "Loops and Repetition",
    concept: "Let's make our character do things multiple times using loops! Loops help us repeat actions without writing the same code over and over.",
    tasks: [
      {
        id: 1,
        instruction: "Start with the 'when green flag clicked' block from Events.",
        blockType: "event_whenflagclicked",
        category: "Events",
        blockImage: "/blocks/when-flag-clicked.png"
      },
      {
        id: 2,
        instruction: "Add a 'repeat 10' block from Control category.",
        blockType: "control_repeat",
        category: "Control",
        blockImage: "/blocks/repeat.png"
      },
      {
        id: 3,
        instruction: "Put a 'move 10 steps' block inside the repeat loop.",
        blockType: "motion_movesteps",
        category: "Motion",
        blockImage: "/blocks/move-steps.png"
      }
    ],
    toolboxCategories: ["Events", "Motion", "Control"],
    sprite: {
      name: "Nexie",
      image: "/sprites/nexie-cat.png",
      startPosition: { x: -200, y: 0 }
    }
  },
  {
    id: 3,
    title: "Making Music and Sounds",
    concept: "Let's learn how to add sounds to our programs! We can make musical notes, play instruments, and create sound effects to make our projects more exciting.",
    tasks: [
      {
        id: 1,
        instruction: "Start with the 'when green flag clicked' block from Events category.",
        blockType: "event_whenflagclicked", 
        category: "Events",
        blockImage: "/blocks/when-flag-clicked.png",
        hint: "This will start our musical program!"
      },
      {
        id: 2,
        instruction: "Add a 'play piano' block from the Sound category.",
        blockType: "sound_play",
        category: "Sound",
        blockImage: "/blocks/sound-play.png",
        hint: "Sound blocks are purple and make different sounds!"
      },
      {
        id: 3,
        instruction: "Now add a 'play note C for 1 second' block from Sound.",
        blockType: "sound_play_note",
        category: "Sound", 
        blockImage: "/blocks/sound-note.png",
        hint: "You can change the note and duration!"
      },
      {
        id: 4,
        instruction: "Add a 'wait 1 second' block from Control to create a pause.",
        blockType: "control_wait",
        category: "Control",
        blockImage: "/blocks/wait.png",
        hint: "This creates a pause between sounds."
      },
      {
        id: 5,
        instruction: "Finally, add a 'play kick drum' block to complete your beat!",
        blockType: "sound_play_drum", 
        category: "Sound",
        blockImage: "/blocks/sound-drum.png",
        hint: "Try different drum sounds!"
      }
    ],
    toolboxCategories: ["Events", "Sound", "Control"],
    sprite: {
      name: "Nexie",
      image: "/sprites/nexie-cat.png",
      startPosition: { x: 0, y: 0 }
    },
    expectedBlocks: [
      {
        type: "event_whenflagclicked",
        next: {
          type: "sound_play",
          fields: {
            SOUND: "piano"
          },
          next: {
            type: "sound_play_note",
            fields: {
              NOTE: "C",
              DURATION: 1
            },
            next: {
              type: "control_wait",
              fields: {
                DURATION: 1
              },
              next: {
                type: "sound_play_drum",
                fields: {
                  DRUM: "kick"
                }
              }
            }
          }
        }
      }
    ]
  },
  {
    id: 4,
    title: "Sound Effects and Volume",
    concept: "Learn how to control sound volume and play different sound effects to make your programs more interactive and fun!",
    tasks: [
      {
        id: 1,
        instruction: "Start with the 'when green flag clicked' event block.",
        blockType: "event_whenflagclicked",
        category: "Events", 
        blockImage: "/blocks/when-flag-clicked.png"
      },
      {
        id: 2,
        instruction: "Set the volume to 80% using the 'set volume to' block.",
        blockType: "sound_set_volume",
        category: "Sound",
        blockImage: "/blocks/sound-volume.png",
        hint: "Volume can be from 0 to 100 percent!"
      },
      {
        id: 3, 
        instruction: "Play a bell sound that waits until it finishes.",
        blockType: "sound_play_sound_until_done",
        category: "Sound",
        blockImage: "/blocks/sound-until-done.png",
        hint: "This waits for the sound to complete before continuing!"
      },
      {
        id: 4,
        instruction: "Add a 'say' block to make your character announce the sound.",
        blockType: "looks_say",
        category: "Looks",
        blockImage: "/blocks/say.png",
        hint: "Make your character say something about the sound!"
      }
    ],
    toolboxCategories: ["Events", "Sound", "Looks"],
    sprite: {
      name: "Nexie", 
      image: "/sprites/nexie-cat.png",
      startPosition: { x: 0, y: 0 }
    }
  },
  {
    id: 5,
    title: "التشات البسيط - Simple Chat",
    concept: "تعلم كيفية إنشاء تطبيق شات بسيط! سنستخدم بلوكات الشات لإرسال الرسائل والرد عليها وإدارة المحادثة.",
    tasks: [
      {
        id: 1,
        instruction: "ابدا بالبلوك 'كي الراية تتنقر' من فئة الأحداث",
        blockType: "event_whenflagclicked",
        category: "Events",
        blockImage: "/blocks/when-flag-clicked.png",
        hint: "هذا سيبدأ برنامج الشات!"
      },
      {
        id: 2,
        instruction: "حط اسم المستخدم متاعك باستخدام بلوك 'حط اسم المستخدم'",
        blockType: "chat_set_username",
        category: "Chat",
        blockImage: "/blocks/chat-username.png",
        hint: "حط اسمك أو اسم المستخدم اللي تحبه!"
      },
      {
        id: 3,
        instruction: "ابعث رسالة ترحيب باستخدام بلوك 'ابعث رسالة'",
        blockType: "chat_send_message",
        category: "Chat",
        blockImage: "/blocks/chat-send.png",
        hint: "اكتب رسالة ترحيب لطيفة!"
      },
      {
        id: 4,
        instruction: "زيد إيموجي مع بلوك 'زيد إيموجي'",
        blockType: "chat_add_emoji",
        category: "Chat",
        blockImage: "/blocks/chat-emoji.png",
        hint: "اختار إيموجي يعبر عن مشاعرك!"
      }
    ],
    toolboxCategories: ["Events", "Chat"],
    sprite: {
      name: "ChatBot",
      image: "/sprites/chatbot.png",
      startPosition: { x: 0, y: 0 }
    }
  },
  {
    id: 6,
    title: "شات تفاعلي - Interactive Chat",
    concept: "طور مهاراتك في الشات! تعلم كيفية الرد على الرسائل، إظهار الكتابة، والرد التلقائي.",
    tasks: [
      {
        id: 1,
        instruction: "ابدا بالبلوك 'كي الراية تتنقر'",
        blockType: "event_whenflagclicked",
        category: "Events",
        blockImage: "/blocks/when-flag-clicked.png"
      },
      {
        id: 2,
        instruction: "حط اسم المستخدم",
        blockType: "chat_set_username",
        category: "Chat",
        blockImage: "/blocks/chat-username.png"
      },
      {
        id: 3,
        instruction: "أظهر إنك تكتب رسالة",
        blockType: "chat_show_typing",
        category: "Chat",
        blockImage: "/blocks/chat-typing.png",
        hint: "هذا يظهر للآخرين إنك تكتب!"
      },
      {
        id: 4,
        instruction: "استنى شوية باستخدام بلوك 'استنى'",
        blockType: "control_wait",
        category: "Control",
        blockImage: "/blocks/wait.png",
        hint: "استنى ثانية أو ثانيتين!"
      },
      {
        id: 5,
        instruction: "ابعث رسالة",
        blockType: "chat_send_message",
        category: "Chat",
        blockImage: "/blocks/chat-send.png"
      },
      {
        id: 6,
        instruction: "حط رد تلقائي",
        blockType: "chat_auto_reply",
        category: "Chat",
        blockImage: "/blocks/chat-auto.png",
        hint: "اختار نوع الرد التلقائي!"
      }
    ],
    toolboxCategories: ["Events", "Chat", "Control"],
    sprite: {
      name: "ChatBot",
      image: "/sprites/chatbot.png",
      startPosition: { x: 0, y: 0 }
    }
  },
  {
    id: 7,
    title: "حركات متقدمة - Advanced Movement",
    concept: "تعلم حركات متقدمة! اتحكم في موقع الشخصية باستخدام الإحداثيات والاتجاهات.",
    tasks: [
      {
        id: 1,
        instruction: "ابدا بالبلوك 'كي الراية تتنقر'",
        blockType: "event_whenflagclicked",
        category: "Events",
        blockImage: "/blocks/when-flag-clicked.png",
        hint: "كل برنامج يبدا بحدث!"
      },
      {
        id: 2,
        instruction: "روح للموقع س:100 ص:50",
        blockType: "motion_goto",
        category: "Motion",
        blockImage: "/blocks/motion-goto.png",
        hint: "استخدم بلوك 'روح للموقع' للانتقال فوراً!"
      },
      {
        id: 3,
        instruction: "اتجه نحو 90 درجة (يمين)",
        blockType: "motion_point_direction",
        category: "Motion", 
        blockImage: "/blocks/motion-direction.png",
        hint: "90 درجة = يمين، -90 = يسار، 0 = فوق، 180 = تحت"
      },
      {
        id: 4,
        instruction: "تحرك للأمام 50 خطوة",
        blockType: "motion_move_forward",
        category: "Motion",
        blockImage: "/blocks/motion-forward.png",
        hint: "سيتحرك في الاتجاه الذي يشير إليه!"
      },
      {
        id: 5,
        instruction: "اطلع بسلاسة للموقع س:0 ص:0 في ثانيتين",
        blockType: "motion_glide",
        category: "Motion",
        blockImage: "/blocks/motion-glide.png",
        hint: "الانتقال السلس أجمل من الانتقال الفوري!"
      }
    ],
    toolboxCategories: ["Events", "Motion"],
    sprite: {
      name: "Rocket",
      image: "/sprites/rocket.png",
      startPosition: { x: -100, y: -50 }
    },
    expectedBlocks: [
      {
        type: "event_whenflagclicked",
        next: {
          type: "motion_goto",
          fields: { X: "100", Y: "50" },
          next: {
            type: "motion_point_direction",
            fields: { DIRECTION: "90" },
            next: {
              type: "motion_move_forward",
              fields: { STEPS: "50" },
              next: {
                type: "motion_glide",
                fields: { SECS: "2", X: "0", Y: "0" }
              }
            }
          }
        }
      }
    ]
  },
  {
    id: 8,
    title: "التحكم بالإحداثيات - Coordinate Control", 
    concept: "اتعلم كيفية التحكم الدقيق في موقع الشخصية باستخدام إحداثيات س و ص.",
    tasks: [
      {
        id: 1,
        instruction: "ابدا بالبلوك 'كي الراية تتنقر'",
        blockType: "event_whenflagclicked",
        category: "Events",
        blockImage: "/blocks/when-flag-clicked.png"
      },
      {
        id: 2,
        instruction: "حط الموقع س على -100",
        blockType: "motion_set_x",
        category: "Motion",
        blockImage: "/blocks/motion-set-x.png",
        hint: "س سالب = يسار، س موجب = يمين"
      },
      {
        id: 3,
        instruction: "غير ص بـ 50",
        blockType: "motion_change_y",
        category: "Motion",
        blockImage: "/blocks/motion-change-y.png", 
        hint: "ص موجب = فوق، ص سالب = تحت"
      },
      {
        id: 4,
        instruction: "كرر 5 مرات: غير س بـ 40",
        blockType: "control_repeat",
        category: "Control",
        blockImage: "/blocks/repeat.png",
        hint: "ضع بلوك 'غير س بـ 40' داخل البلوك كرر!"
      },
      {
        id: 5,
        instruction: "اضف بلوك 'إذا لمست الحافة، ارتد'",
        blockType: "motion_if_on_edge_bounce",
        category: "Motion",
        blockImage: "/blocks/motion-bounce.png",
        hint: "هذا سيجعل الشخصية ترتد عند وصولها لحافة الشاشة"
      }
    ],
    toolboxCategories: ["Events", "Motion", "Control"],
    sprite: {
      name: "Ball",
      image: "/sprites/ball.png",
      startPosition: { x: 0, y: 0 }
    }
  },
  {
    id: 9,
    title: "مطاردة الفأرة - Mouse Chase",
    concept: "اجعل الشخصية تتبع مؤشر الفأرة باستخدام الحركة الذكية!",
    tasks: [
      {
        id: 1,
        instruction: "ابدا بالبلوك 'كي الراية تتنقر'",
        blockType: "event_whenflagclicked",
        category: "Events",
        blockImage: "/blocks/when-flag-clicked.png"
      },
      {
        id: 2,
        instruction: "اضف بلوك 'كرر دايما'",
        blockType: "control_forever",
        category: "Control",
        blockImage: "/blocks/forever.png",
        hint: "هذا سيجعل الحركة مستمرة!"
      },
      {
        id: 3,
        instruction: "داخل البلوك كرر: اتجه نحو مؤشر الفأرة",
        blockType: "motion_point_towards",
        category: "Motion",
        blockImage: "/blocks/motion-point-towards.png",
        hint: "ضع هذا داخل بلوك 'كرر دايما'"
      },
      {
        id: 4,
        instruction: "اضف بلوك 'تحرك للأمام 5 خطوات'",
        blockType: "motion_move_forward",
        category: "Motion",
        blockImage: "/blocks/motion-forward.png",
        hint: "اجعل الخطوات قليلة للحركة السلسة"
      }
    ],
    toolboxCategories: ["Events", "Motion", "Control"],
    sprite: {
      name: "Cat",
      image: "/sprites/nexie-cat.png",
      startPosition: { x: 0, y: 0 }
    }
  }
];

export const getLesson = (id) => lessons.find(lesson => lesson.id === id);
export const getAllLessons = () => lessons;
