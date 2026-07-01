const projectsData = [
  {
    index: "01",
    title: "Drone Control System v3",
    category: "iot",
    description: "Full-stack teleoperation platform enabling real-time drone control with UDP video streaming and embedded hardware communication.",
    tags: ["Android", "Python", "ESP32", "UDP", "Bluetooth"],
    link: "#",
    status: "private",
    featured: true,
    architecture: `Android Phone
   ↓ UDP Video
Python Ground Control Station
   ↓ Control Commands
Bluetooth Communication
   ↓
ESP32 Receiver
   ↓ PWM Signals
Drone Servos / Hardware`
  },
  {
    index: "02",
    title: "Smart BLE Garden Valve",
    category: "iot",
    description: "Off-grid smart irrigation controller using ESP32 BLE communication enabling mobile-based watering schedule control without WiFi.",
    tags: ["ESP32", "BLE", "Relay", "Water Valve"],
    link: "https://github.com/mauryashah20/automatic-fluid-Valve-controlled-by-android-application",
    status: "public",
    featured: true,
    architecture: `Mobile App
   ↓ BLE Communication
ESP32 Controller
   ↓ Timer Scheduler
Relay Module
   ↓
Water Valve System`
  },
  {
    index: "03",
    title: "ESP-NOW RC Link",
    category: "iot",
    description: "Low latency peer-to-peer remote control protocol using ESP32 ESP-NOW communication.",
    tags: ["ESP32", "C++", "ESP-NOW", "Embedded Systems"],
    link: "https://github.com/mauryashah20/espnow-transmitter-and-receiver",
    status: "public"
  },
  {
    index: "04",
    title: "Sign Language Detector",
    category: "hobby",
    description: "Real-time computer vision system translating hand gestures into text using MediaPipe.",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    link: "https://github.com/mauryashah20/sign-language-translator",
    status: "public"
  },
  {
    index: "05",
    title: "LAN Chat System",
    category: "hobby",
    description: "A local area network chat application enabling instant messaging and communication between devices.",
    tags: ["Networking", "C/C++", "Sockets"],
    link: "https://github.com/mauryashah20/LANchat",
    status: "public"
  },
  {
    index: "06",
    title: "ESP32 BLE Gamepad",
    category: "iot",
    description: "Custom hardware gamepad built with ESP32 using Bluetooth Low Energy (BLE) for ultra-low latency inputs.",
    tags: ["ESP32", "BLE", "Hardware", "Gamepad"],
    link: "https://github.com/mauryashah20/low-latency-BLE-controller",
    status: "public"
  },
  {
    index: "07",
    title: "Gimbal Stabilizer",
    category: "iot",
    description: "Active camera stabilization system using IMU sensors and PID control loops to maintain level orientation.",
    tags: ["PID Control", "IMU Sensors", "Robotics", "Embedded"],
    link: "https://github.com/mauryashah20/gimble",
    status: "public"
  },
  {
    index: "08",
    title: "Joystick Control",
    category: "iot",
    description: "Hardware interface system interpreting analog joystick inputs into precise digital commands for remote platforms.",
    tags: ["Analog Processing", "Embedded C", "Hardware"],
    link: "https://github.com/mauryashah20/joysticks-version1",
    status: "public"
  },
  {
    index: "09",
    title: "GST Refund Portal",
    category: "website",
    description: "An automated invoice parsing and statement generation system streamlining inverted duty structure filing.",
    tags: ["Node.js", "SQLite3", "Python", "ExcelJS"],
    link: "https://www.gst-refund.com/",
    status: "public",
    linkLabel: "Visit Website"
  },
  {
    index: "10",
    title: "Glamour Studio",
    category: "website",
    description: "A premium portfolio showcase for a photography studio featuring luxury aesthetics and modern transitions.",
    tags: ["HTML5", "CSS3", "Vanilla JS", "Local SEO"],
    link: "https://www.glamourphotos.in/",
    status: "public",
    linkLabel: "Visit Website"
  }
];
