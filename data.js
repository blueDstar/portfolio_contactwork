/* NỘI DUNG: chỉnh dữ liệu tại đây. Mỗi chuỗi dịch có dạng {vi, en}.
   Không thêm số liệu/kết quả, tên công ty hoặc URL dự án chưa xác nhận. */
window.PORTFOLIO = (() => {
  const bi = (vi, en) => ({vi, en});
  const PROFILE = {
    name: 'Nguyễn Văn Đạt', englishName: 'Nguyen Van Dat', role: 'Junior Robotics R&D Engineer',
    location: 'Ho Chi Minh City, Vietnam', email: 'datvan.contact4work@gmail.com',
    github: 'https://github.com/blueDstar', linkedin: 'https://www.linkedin.com/in/vandat152/',
    intro: bi('Tôi là Nguyễn Văn Đạt, theo đuổi Robotics R&D với nền tảng về hệ thống nhúng, điều khiển và thị giác máy tính. Tôi thích kết nối thiết kế cơ khí, phần cứng và phần mềm để đưa ý tưởng thành những hệ robot có thể lắp ráp, thử nghiệm và cải tiến.', "I'm Nguyen Van Dat, focused on Robotics R&D, embedded systems, control and computer vision. I enjoy connecting mechanical design, electronics and software to turn ideas into robotic systems that can be assembled, tested and improved."),
    education: bi('Cử nhân xuất sắc ngành Robot và Trí tuệ nhân tạo', 'Bachelor’s degree in Robotics and Artificial Intelligence — Excellent classification'),
    university: bi('Trường Đại học Công nghệ TP. Hồ Chí Minh — HUTECH', 'Ho Chi Minh City University of Technology — HUTECH'), educationDates: '08/2022 — 08/2026',
    educationGPA: '3.74 / 4.0',
    educationLocation: bi('Hồ Chí Minh','Ho Chi Minh City'),
    educationFocus: bi('Lĩnh vực chính: Robotics, Hệ thống nhúng, Điều khiển tự động, Computer Vision, AI, IoT.','Main fields: Robotics, Embedded Systems, Automatic Control, Computer Vision, AI, IoT.'),
    educationThesis: bi('Đồ án tốt nghiệp: Hệ thống xe tự hành sử dụng ROS2 và Raspberry Pi.','Graduation thesis: Autonomous Vehicle System Using ROS2 and Raspberry Pi.')
  };
  /* ASSETS: chỉ đổi null thành đường dẫn khi file thật đã nằm trong assets/.
     Ảnh nên tách nền, cùng tỉ lệ khung 640:720. Object-position chỉnh độc lập. */
  const ASSETS = {heroPortrait:'portrait-hero', aboutPortrait:'portrait-about', readingPortrait:'portrait-reading', contactPortrait:'portrait-contact', experiencePortrait:'portrait-experience', portraitAssembly:null, portraitPointing:null, assemblyPosition:'50% 50%', pointingPosition:'50% 50%', cvVI:'./assets/cv-vi.pdf', cvEN:'./assets/cv-en.pdf'};
  const MOTION = {route:640, reduced:120, swap:280, pose:720};
  const EXPERIENCES = [
    {id:'robotics', title:'Robotics R&D', company:'LYK / Hilykan', logo:'logo-hilykan', role:bi('Kỹ sư R&D Cơ điện tử & Tay robot', 'Mechatronics & Robotic Arm R&D Engineer'), summary:bi('Nghiên cứu và tích hợp cơ cấu, truyền động và phần mềm cho tay robot; phát triển CAD, đồ gá và mô phỏng phục vụ kiểm tra chất lượng.', 'Researching and integrating mechanisms, actuation and software for robotic arms; developing CAD, fixtures and simulations for quality inspection.'), dates:'08/2026 — 10/2026', art:'motor', groups:[
      {name:'Actuation', text:bi('Tham gia khởi đầu hoạt động R&D cánh tay robot. Nghiên cứu Damiao DM-J4310 cho OpenArm: kết nối phần cứng, mô phỏng và thử nghiệm điều khiển qua CAN bus.', 'Contributed to the initial robotic-arm R&D effort. Researched Damiao DM-J4310 actuators for OpenArm, including hardware connections, simulation and CAN-bus control experiments.')},
      {name:'CAD & Fixtures', text:bi('Thiết kế mô hình 3D, lắp ráp và bản vẽ kỹ thuật SolidWorks cho smartwatch jig và vision station phục vụ QC đồng hồ. Thiết kế CAD 3D và bản vẽ Shoe QC Box cho ứng dụng OpenArm trong kiểm tra chất lượng giày.', 'Created SolidWorks 3D models, assemblies and technical drawings for a smartwatch fixture and vision station for quality inspection. Created 3D CAD models and SolidWorks drawings for a Shoe QC Box intended for OpenArm-based shoe quality inspection.')},
      {name:'Simulation', text:bi('Mô phỏng chuyển động vision station và các cơ cấu gá/kẹp theo yêu cầu vận hành.', 'Simulated vision-station and fixture/clamping-mechanism movements against operational requirements.')}
    ]},
    {id:'dat-group', title:'R&D Intern', company:'DAT Group', logo:'logo-dat', role:bi('Thực tập sinh R&D', 'R&D Intern'), summary:bi('Phát triển các mô-đun thị giác, triển khai trên thiết bị biên và kết nối dữ liệu với ứng dụng giám sát, chatbot RAG.', 'Developing computer-vision modules, deploying to edge devices and connecting data to monitoring applications and a RAG chatbot.'), dates:'01/2026 — 04/2026', art:'pi', groups:[
      {name:'Computer Vision', text:bi('Phát triển mô-đun thị giác máy tính phục vụ nhận diện người, phát hiện trạng thái bất thường và vật thể lạ.', 'Developed computer-vision modules for person recognition, abnormal-state detection and foreign-object detection.')},
      {name:'Edge Deployment', text:bi('Triển khai trên Jetson Nano và tích hợp ứng dụng web giám sát.', 'Deployed on Jetson Nano and integrated a web monitoring application.')},
      {name:'RAG & Data', text:bi('Phát triển chatbot RAG cho ứng dụng năng lượng mặt trời và thang máy thông minh. Thiết kế dữ liệu MongoDB/PostgreSQL cho log, cảnh báo và dữ liệu nhận diện.', 'Developed a RAG chatbot for solar-energy and smart-elevator applications. Designed MongoDB/PostgreSQL data structures for logs, alerts and recognition data.')}
    ]}
  ];
  /* PROJECTS: image/video/repo = null thì không sinh link hoặc media hỏng.
     image: ảnh thật; video: video thật; illustrationOnly:false khi thêm bằng chứng.
     learnings là chủ đề nhìn lại, không phải tuyên bố kết quả đã đo. */
  const PROJECTS = [
    {
      "slug": "ros2-autonomous-vehicle",
      "name": {
        "vi": "Xe tự hành ROS2",
        "en": "ROS2 autonomous vehicle"
      },
      "subtitle": "Autonomous Car / Raspberry Pi 5",
      "dates": "02/2026 — 08/2026",
      "categories": [
        "Robotics",
        "Embedded"
      ],
      "tech": [
        "ROS2",
        "C++ / OpenCV",
        "NCNN",
        "Raspberry Pi 5",
        "Docker"
      ],
      "art": "car",
      "status": {
        "vi": "Đồ án tốt nghiệp · nền tảng thử nghiệm",
        "en": "Graduation project · test platform"
      },
      "image": null,
      "video": null,
      "repo": null,
      "illustrationOnly": false,
      "cover": "car-overview",
      "shortDescription": {
        "vi": "Nền tảng xe thật trên sa bàn đô thị, kết nối phân đoạn làn đường, homography và telemetry ROS2 với dashboard quan sát hệ thống.",
        "en": "A physical vehicle on an urban test track, connecting lane segmentation, homography and ROS2 telemetry with a dashboard for inspecting the system."
      },
      "overview": {
        "vi": "Một hệ xe thử nghiệm để kết nối nhận thức môi trường với thông tin hình học có thể kiểm tra. Pipeline thị giác nhận ảnh, phân đoạn làn và chiếu xuống mặt đường trước khi xuất dữ liệu qua ROS2. Ảnh xe và sa bàn cho thấy nền tảng thực tế của đồ án.",
        "en": "An experimental vehicle connects perception to inspectable geometric information. Its vision pipeline receives images, segments lanes and projects them onto the ground plane before publishing ROS2 data. Vehicle and track photographs document the physical platform."
      },
      "contribution": {
        "vi": "Nhận diện làn đường và biển báo, xử lý hình học, xây dựng quỹ đạo và tích hợp hệ thống trên sa bàn đô thị. Phần case study này tập trung vào thị giác, telemetry và công cụ quan sát.",
        "en": "Lane and sign recognition, geometric processing, trajectory generation and system integration on an urban model. This case study focuses on vision, telemetry and inspection tools."
      },
      "goal": {
        "vi": "Biến vùng làn trong ảnh phối cảnh thành centerline, waypoint và các tham số hình học để các khối tiếp theo sử dụng và debug.",
        "en": "Convert lane regions in perspective images into centre lines, waypoints and geometric parameters that downstream modules can inspect and use."
      },
      "system": {
        "vi": "Camera / video → NCNN segmentation → IPM / homography → centerline & lane geometry → ROS2 telemetry / web dashboard.",
        "en": "Camera / video → NCNN segmentation → IPM / homography → centre line & lane geometry → ROS2 telemetry / web dashboard."
      },
      "architecture": [
        "Camera / video",
        "NCNN segmentation",
        "IPM / homography",
        "Lane geometry",
        "ROS2 / dashboard"
      ],
      "approach": [
        {
          "title": {
            "vi": "Phân đoạn và telemetry",
            "en": "Segmentation & telemetry"
          },
          "text": {
            "vi": "Chạy mô hình qua NCNN, lấy contour/polygon và publish dữ liệu nhận thức ở không gian ảnh.",
            "en": "Run inference through NCNN, extract contours/polygons and publish image-space perception data."
          }
        },
        {
          "title": {
            "vi": "Từ pixel sang mặt đường",
            "en": "From pixels to the ground"
          },
          "text": {
            "vi": "Áp dụng homography từ calibration, trích centerline và khớp đường đa thức cho các làn phù hợp.",
            "en": "Apply calibrated homography, extract centre lines and fit polynomial lane representations."
          }
        },
        {
          "title": {
            "vi": "Đầu ra hình học",
            "en": "Geometric outputs"
          },
          "text": {
            "vi": "Chọn nhánh làn theo route intent rồi publish epsilon_x_mm, epsilon_y_mm và theta_rad. Trong báo cáo thị giác, control_node là khối hậu xử lý hình học.",
            "en": "Select a lane branch using route intent and publish epsilon_x_mm, epsilon_y_mm and theta_rad. In the vision report, control_node performs geometric post-processing."
          }
        },
        {
          "title": {
            "vi": "Quan sát hệ thống",
            "en": "System inspection"
          },
          "text": {
            "vi": "Dùng dashboard và graph ROS2 để đối chiếu ảnh đầu vào, polygon, dữ liệu mặt đường và topic.",
            "en": "Use the dashboard and ROS2 graph to compare camera input, polygons, ground-plane data and topics."
          }
        }
      ],
      "evidence": {
        "vi": "Có ảnh xe thật, sa bàn, RViz, dashboard và graph ROS2. Tài liệu thị giác xác nhận pipeline tới các tham số hình học; không dùng screenshot để suy ra SLAM, navigation hoặc chất lượng điều khiển. Không có video trong bộ tài nguyên được cung cấp.",
        "en": "Evidence includes physical-vehicle and track photos, RViz, dashboard and ROS2 graph captures. The vision document describes the pipeline through geometric outputs; screenshots are not used to infer SLAM, navigation or controller quality. The supplied assets contain no video."
      },
      "limits": {
        "vi": "Các con số trên screenshot là trạng thái của phiên ghi hình, không phải benchmark tổng hợp. Phạm vi báo cáo thị giác kết thúc ở dữ liệu hình học, không bao gồm firmware hay thuật toán điều khiển chuyển động.",
        "en": "Numbers visible in screenshots belong to their recorded sessions, not an aggregate benchmark. The vision-report scope ends at geometric data and excludes firmware and motion-controller algorithms."
      },
      "learnings": {
        "vi": "Thiết kế các tầng xử lý có đầu ra quan sát được giúp lần theo sai lệch từ ảnh đến dữ liệu hình học, thay vì chỉ nhìn kết quả cuối.",
        "en": "Inspectable intermediate outputs make it possible to trace discrepancies from image input to geometric data rather than observing only the final result."
      },
      "gallery": [
        "car-overview",
        "car-front",
        "car-track",
        "car-intersection",
        "car-rviz",
        "car-dashboard",
        "car-bev",
        "car-intent",
        "car-ros-graph"
      ],
      "chapters": [
        {
          "title": {
            "vi": "Robot trước, dữ liệu sau.",
            "en": "The robot, then the data."
          },
          "text": {
            "vi": "Camera, phần cứng trên xe và môi trường sa bàn đặt các bước xử lý vào một bối cảnh cụ thể.",
            "en": "The camera, onboard hardware and track give the software pipeline a physical context."
          },
          "media": [
            "car-front",
            "car-intersection"
          ],
          "layout": "pair"
        },
        {
          "title": {
            "vi": "Một môi trường thử có cấu trúc.",
            "en": "A structured test environment."
          },
          "text": {
            "vi": "Làn, giao lộ và biển báo là đầu vào quan sát được; ảnh toàn cảnh giúp đọc các screenshot phía sau.",
            "en": "Lanes, intersections and signs are observable inputs; the overview gives context to later screenshots."
          },
          "media": [
            "car-track"
          ],
          "layout": "wide"
        },
        {
          "title": {
            "vi": "Từ camera đến hình học làn.",
            "en": "From camera to lane geometry."
          },
          "text": {
            "vi": "Giữ màu segmentation và BEV để phân biệt các vùng dữ liệu. Có thể mở ảnh lớn để đọc chi tiết của phiên ghi hình.",
            "en": "Segmentation and BEV colours remain intact to distinguish data regions. Open the full-size images to inspect a recorded session."
          },
          "media": [
            "car-dashboard",
            "car-bev"
          ],
          "layout": "editorial"
        },
        {
          "title": {
            "vi": "Kiểm tra từng khối.",
            "en": "Inspecting each module."
          },
          "text": {
            "vi": "RViz hiển thị model; route intent chọn nhánh xử lý; graph thể hiện các đường truyền dữ liệu thực sự có trong phiên chạy.",
            "en": "RViz displays the model, route intent selects a processing branch, and the graph records the session’s data connections."
          },
          "media": [
            "car-rviz",
            "car-intent",
            "car-ros-graph"
          ],
          "layout": "mixed"
        }
      ]
    },
    {
      "slug": "smartwatch-vision-station",
      "name": {
        "vi": "Vision Station",
        "en": "Vision Station"
      },
      "subtitle": "Smartwatch Jig / CAD & simulation",
      "dates": "08/2026 — 10/2026",
      "categories": [
        "CAD"
      ],
      "tech": [
        "SolidWorks",
        "3D CAD",
        "PySide6",
        "PyVista / VTK",
        "Motion Simulation"
      ],
      "art": "jig",
      "status": {
        "vi": "Thiết kế CAD & mô phỏng",
        "en": "CAD design & simulation"
      },
      "image": null,
      "video": null,
      "repo": null,
      "illustrationOnly": false,
      "cover": "vision-isometric",
      "shortDescription": {
        "vi": "Station kiểm tra đồng hồ với jig, cụm camera–LED tịnh tiến và các cụm kẹp; CAD và GUI mô phỏng giúp review chuyển động, trình tự QC.",
        "en": "A watch inspection station with a jig, translating camera–LED assembly and clamps; CAD and a simulation GUI support motion and QC-sequence review."
      },
      "overview": {
        "vi": "Một station kết nối đồ gá smartwatch với cụm quan sát camera–LED. Assembly SolidWorks giữ riêng từng component để mô phỏng trục vision, bốn ngàm thân và hai kẹp dây. Bộ góc nhìn dưới đây dùng cùng configuration Default.",
        "en": "A station connects a smartwatch fixture with a camera–LED inspection assembly. Its SolidWorks assembly keeps components separate for the vision axis, four body jaws and two strap clamps. The view sequence below uses one Default configuration."
      },
      "contribution": {
        "vi": "Thiết kế mô hình 3D, lắp ráp và bản vẽ kỹ thuật SolidWorks cho smartwatch jig và vision station; mô phỏng chuyển động của station và các cơ cấu gá/kẹp theo yêu cầu vận hành.",
        "en": "Created SolidWorks 3D models, assemblies and technical drawings for the smartwatch jig and vision station; simulated station and fixture/clamp motions against operational requirements."
      },
      "goal": {
        "vi": "Đặt sản phẩm đúng vị trí, phối hợp kẹp thân/kẹp dây và nhường đường cho cụm vision trước bước quan sát QC.",
        "en": "Position the product, coordinate body and strap clamps, and provide clearance for the vision assembly before QC observation."
      },
      "system": {
        "vi": "Assembly SolidWorks → mesh theo component → nhóm VISION / ngàm / kẹp dây → trình tự MANUAL/AUTO → camera QC mô phỏng và nhật ký.",
        "en": "SolidWorks assembly → per-component meshes → VISION / jaw / strap groups → MANUAL/AUTO sequence → simulated QC camera and journal."
      },
      "architecture": [
        "SolidWorks assembly",
        "Component meshes",
        "Motion groups",
        "QC sequence",
        "Simulated camera"
      ],
      "approach": [
        {
          "title": {
            "vi": "Giữ cấu trúc CAD",
            "en": "Preserve CAD structure"
          },
          "text": {
            "vi": "Giữ component và transform lắp ráp thay vì gộp cả station thành một mesh bất động.",
            "en": "Preserve components and assembly transforms rather than merging the station into a single static mesh."
          }
        },
        {
          "title": {
            "vi": "Tách nhóm cơ cấu",
            "en": "Separate mechanism groups"
          },
          "text": {
            "vi": "Trục vision tịnh tiến; các ngàm và kẹp dây có nhóm chuyển động riêng. Giá trị chưa được mate/số đo xác nhận mang nhãn DEMO.",
            "en": "The vision axis translates, with separate jaw and strap-clamp groups. Values not established by mates or measurements are marked DEMO."
          }
        },
        {
          "title": {
            "vi": "Ràng buộc trình tự",
            "en": "Sequence constraints"
          },
          "text": {
            "vi": "Nạp → kẹp thân → kẹp dây → đưa vision vào vị trí → chụp → nhả → tháo. Interlock chặn thao tác xung đột.",
            "en": "Load → clamp body → clamp straps → position vision → capture → release → unload. Interlocks block conflicting actions."
          }
        },
        {
          "title": {
            "vi": "Tách quan sát khỏi QC",
            "en": "Separate viewing from QC"
          },
          "text": {
            "vi": "Camera QC mô phỏng độc lập với camera orbit của viewport; ROI và nhật ký gắn với chu trình.",
            "en": "The simulated QC camera is independent of the viewport orbit camera; ROI and journal entries belong to the cycle."
          }
        }
      ],
      "evidence": {
        "vi": "Có bộ Front/Top/Right/Isometric xuất từ SolidWorks, ảnh mesh nhập và GUI điều khiển, Camera QC, chu trình. Đây là bằng chứng thiết kế và mô phỏng, không phải ảnh station đã chế tạo.",
        "en": "Evidence includes SolidWorks Front/Top/Right/Isometric views, an imported-mesh detail and control, Camera QC and cycle GUIs. These document design and simulation, not a fabricated physical station."
      },
      "limits": {
        "vi": "PASS/FAIL là kịch bản xác định trong ROI, chưa phải thuật toán vision thật. Hành trình, home, tiếp xúc, sensor/lens và một số tham số động học vẫn cần xác nhận từ mate hoặc đo thực tế; chưa xác nhận lực kẹp hay quang học.",
        "en": "PASS/FAIL is a deterministic ROI scenario, not a real vision algorithm. Travel, home, contacts, sensor/lens and some kinematic parameters still require mate or physical measurements; clamping force and optics are not validated."
      },
      "learnings": {
        "vi": "Mô hình hình học, tham số động học và kết quả QC cần có nguồn riêng. Việc giữ nhãn DEMO giúp review thiết kế mà không biến một giả định thành thông số đã xác nhận.",
        "en": "Geometry, motion parameters and QC outcomes need distinct provenance. Explicit DEMO labels allow design review without turning an assumption into a validated specification."
      },
      "gallery": [
        "vision-isometric",
        "vision-front",
        "vision-right",
        "vision-top",
        "vision-jig",
        "vision-gui",
        "vision-camera",
        "vision-cycle"
      ],
      "views": [
        "vision-isometric",
        "vision-front",
        "vision-right",
        "vision-top"
      ],
      "chapters": [
        {
          "title": {
            "vi": "Nhìn gần cơ cấu gá.",
            "en": "A closer look at the fixture."
          },
          "text": {
            "vi": "Các ngàm thân và hai kẹp dây được giữ riêng trong cấu trúc assembly để xem xét từng nhóm chuyển động.",
            "en": "Body jaws and the two strap clamps remain separate in the assembly for motion-group review."
          },
          "media": [
            "vision-jig"
          ],
          "layout": "wide"
        },
        {
          "title": {
            "vi": "Từ mô hình đến thao tác.",
            "en": "From model to operation."
          },
          "text": {
            "vi": "GUI đặt nhóm cơ cấu cạnh trạng thái thao tác; Camera QC và chu trình được trình bày thành các đầu ra riêng.",
            "en": "The GUI connects mechanism groups to operation states; Camera QC and the cycle are distinct outputs."
          },
          "media": [
            "vision-gui",
            "vision-camera",
            "vision-cycle"
          ],
          "layout": "wide"
        }
      ]
    },
    {
      "slug": "damiao-motor-control",
      "name": {
        "vi": "Damiao Motor Control",
        "en": "Damiao Motor Control"
      },
      "subtitle": "DM4310 V3 / USB2CAN / 2 DOF",
      "dates": "08/2026 — 10/2026",
      "categories": [
        "Robotics",
        "Embedded"
      ],
      "tech": [
        "Python",
        "USB2CAN",
        "CAN bus",
        "MIT mode",
        "Tkinter"
      ],
      "art": "motor",
      "status": {
        "vi": "Nghiên cứu điều khiển & GUI mô phỏng",
        "en": "Control research & simulation GUI"
      },
      "image": null,
      "video": null,
      "repo": null,
      "illustrationOnly": false,
      "cover": "damiao-gui",
      "shortDescription": {
        "vi": "Nghiên cứu điều khiển động cơ Damiao qua USB2CAN, từ lệnh Position/Jog tới feedback và GUI tay máy 2 DOF có chế độ DemoBus tách biệt.",
        "en": "Damiao actuator-control research through USB2CAN, connecting Position/Jog commands, feedback and a 2-DOF arm GUI with an explicitly separate DemoBus simulation mode."
      },
      "overview": {
        "vi": "Đưa lệnh điều khiển, feedback và hình dung chuyển động về cùng một luồng dữ liệu. Tài liệu dự án mô tả DM4310 V3 ở MIT mode với transport USB2CAN thật hoặc DemoBus. Ảnh GUI hiện có được chụp ở chế độ mô phỏng CAN.",
        "en": "Commands, feedback and motion visualisation share a data path. The project documentation describes DM4310 V3 in MIT mode using either real USB2CAN transport or DemoBus. The available GUI capture uses simulated CAN."
      },
      "contribution": {
        "vi": "Nghiên cứu động cơ cho hướng OpenArm, kết nối phần cứng, mô phỏng và thử nghiệm điều khiển CAN bus. Phạm vi trình bày gồm kiến trúc lệnh/feedback và GUI có trong tư liệu dự án.",
        "en": "Researched actuators for the OpenArm direction, including hardware connections, simulation and CAN-bus control experiments. The presentation covers the documented command/feedback architecture and GUI."
      },
      "goal": {
        "vi": "Tách lệnh điều khiển, định tuyến feedback và hiển thị mô hình để quan sát đúng dữ liệu từng trục, đồng thời phân biệt bus thật với bus mô phỏng.",
        "en": "Separate commands, feedback routing and model display so each axis can be inspected while keeping real and simulated transports distinct."
      },
      "system": {
        "vi": "GUI Position / Jog → MultiMotorController → CANRouter / codec → USB2CAN hoặc DemoBus → feedback / PositionTracker → đồ thị và mô hình 2 DOF.",
        "en": "Position / Jog GUI → MultiMotorController → CANRouter / codec → USB2CAN or DemoBus → feedback / PositionTracker → plots and the 2-DOF model."
      },
      "architecture": [
        "Position / Jog",
        "Controller / router",
        "USB2CAN / DemoBus",
        "Feedback tracker",
        "GUI / 2-DOF model"
      ],
      "approach": [
        {
          "title": {
            "vi": "Một nguồn nhận CAN",
            "en": "A single CAN receiver"
          },
          "text": {
            "vi": "CANRouter quản lý receiver dùng chung; các session xử lý lệnh từng trục độc lập.",
            "en": "CANRouter owns the shared receiver; sessions process per-axis commands independently."
          }
        },
        {
          "title": {
            "vi": "Position và Manual Jog",
            "en": "Position & manual jog"
          },
          "text": {
            "vi": "Tài liệu phân biệt quay thêm từ vị trí hiện tại, đi tới góc theo zero phần mềm và chạy tốc độ có dấu đến khi dừng.",
            "en": "The documentation distinguishes relative moves, software-zero targets and signed-velocity jogging until stopped."
          }
        },
        {
          "title": {
            "vi": "Mô hình theo feedback",
            "en": "A feedback-driven model"
          },
          "text": {
            "vi": "Ở bus thật, tư thế chỉ cập nhật từ feedback mới đúng Master ID; xoay camera không phát frame CAN.",
            "en": "With real transport, model pose updates from fresh feedback for the correct Master ID; orbiting the camera does not send CAN frames."
          }
        }
      ],
      "evidence": {
        "vi": "Có ảnh tham chiếu động cơ và GUI 2 DOF. GUI ghi rõ “MÔ PHỎNG CAN · FEEDBACK ẢO”; không dùng nó làm bằng chứng hai motor thật đang vận hành. Chưa có ảnh bàn thử hoặc video phần cứng trong thư mục được cung cấp.",
        "en": "Evidence comprises a motor reference image and the 2-DOF GUI. The GUI explicitly states simulated CAN and virtual feedback; it is not proof of two physical motors running. The supplied folder contains no test-bench photograph or hardware video."
      },
      "limits": {
        "vi": "Mô hình 2 DOF là động học; chưa mô phỏng trọng lực, tải, va chạm, backlash hay giới hạn cơ khí. Không công bố tần số điều khiển hoặc độ chính xác thực nghiệm.",
        "en": "The 2-DOF model is kinematic; gravity, load, collision, backlash and mechanical limits are not simulated. No measured control frequency or accuracy is claimed."
      },
      "learnings": {
        "vi": "Gắn tư thế hiển thị với nguồn feedback và trạng thái transport giúp tách một trình diễn giao diện khỏi một kết quả đã đo trên phần cứng.",
        "en": "Tying the displayed pose to feedback provenance and transport state distinguishes a GUI demonstration from a measured hardware result."
      },
      "gallery": [
        "damiao-motor",
        "damiao-gui"
      ],
      "chapters": [
        {
          "title": {
            "vi": "Lệnh, feedback và mô hình.",
            "en": "Commands, feedback and the model."
          },
          "text": {
            "vi": "Giao diện đặt điều khiển hai khớp cạnh model, giữ nhãn nguồn dữ liệu mô phỏng ngay trong khung quan sát.",
            "en": "The interface places joint controls next to the model, keeping simulated-data provenance visible."
          },
          "media": [
            "damiao-gui"
          ],
          "layout": "wide"
        }
      ]
    },
    {
      "slug": "shoe-qc-box",
      "name": {
        "vi": "Shoe QC Box",
        "en": "Shoe QC Box"
      },
      "subtitle": "Dual shutter / CAD & sequence simulation",
      "dates": "08/2026 — 10/2026",
      "categories": [
        "CAD"
      ],
      "tech": [
        "SolidWorks / STEP",
        "Python / PySide6",
        "PyVista / VTK",
        "FSM / Interlocks"
      ],
      "art": "box",
      "status": {
        "vi": "Thiết kế CAD & mô phỏng cửa",
        "en": "CAD design & shutter simulation"
      },
      "image": null,
      "video": null,
      "repo": null,
      "illustrationOnly": false,
      "cover": "shoe-overview",
      "shortDescription": {
        "vi": "Hộp QC hai cửa từ CAD STEP, với mô phỏng trình tự đưa giày, quan sát camera và liên động đóng mở trong phạm vi cơ cấu đã chọn.",
        "en": "A dual-shutter QC enclosure from STEP CAD, simulating shoe insertion, camera views and opening/closing interlocks within an explicitly selected mechanism scope."
      },
      "overview": {
        "vi": "Một hộp kiểm tra chất lượng giày được thiết kế cho hướng ứng dụng OpenArm. Tư liệu mô phỏng dùng hình học STEP Rev A và giữ các phần minh họa robot, giày, camera riêng khỏi CAD nguồn. Phạm vi động học được giới hạn rõ thay vì che các giao cắt thiết kế.",
        "en": "A shoe quality-inspection enclosure designed for the OpenArm application direction. Its simulation uses Rev A STEP geometry while keeping robot, shoe and camera demonstration assets separate. Kinematic scope is explicit rather than hiding design clashes."
      },
      "contribution": {
        "vi": "Thiết kế CAD 3D và bản vẽ SolidWorks cho Shoe QC Box phục vụ ứng dụng OpenArm trong kiểm tra chất lượng giày. Phần tư liệu đi sâu vào cấu trúc cửa, trình tự và giới hạn mô phỏng.",
        "en": "Created 3D CAD models and SolidWorks drawings for a Shoe QC Box intended for OpenArm-based shoe inspection. The accompanying material details shutter structure, sequencing and simulation limits."
      },
      "goal": {
        "vi": "Phối hợp hai cửa và quá trình đưa/rút sản phẩm, giữ vùng cửa trống trước khi đóng và thể hiện được từng trạng thái vận hành.",
        "en": "Coordinate both shutters with product insertion and withdrawal, keep the doorway clear before closing and make operating states inspectable."
      },
      "system": {
        "vi": "STEP / BOM → nhóm cửa và phần cố định → engine động học → FSM / interlock → camera QC mô phỏng và log.",
        "en": "STEP / BOM → moving and fixed groups → kinematic engine → FSM / interlocks → simulated QC camera and logs."
      },
      "architecture": [
        "STEP geometry",
        "Moving / fixed groups",
        "Motion engine",
        "FSM / interlocks",
        "Camera / logs"
      ],
      "approach": [
        {
          "title": {
            "vi": "Giữ hình học nguồn",
            "en": "Keep source geometry"
          },
          "text": {
            "vi": "Dùng hình học STEP, không thay đổi offset hay kích thước để làm biến mất giao cắt CAD.",
            "en": "Use STEP geometry without changing offsets or dimensions to conceal CAD clashes."
          }
        },
        {
          "title": {
            "vi": "Phạm vi cơ cấu rõ ràng",
            "en": "An explicit mechanism scope"
          },
          "text": {
            "vi": "PLATE_AND_BLOCKS mô phỏng tấm cửa, block và ty tham số; P09/P11 được loại khỏi chuyển động do giao cắt nguồn.",
            "en": "PLATE_AND_BLOCKS animates shutter plates, blocks and parametric rods; P09/P11 are excluded from motion because of source clashes."
          }
        },
        {
          "title": {
            "vi": "Chu trình có điều kiện",
            "en": "Conditional sequencing"
          },
          "text": {
            "vi": "Chỉ mở khi cửa đối diện đóng; giữ cửa mở khi kiểm tra và chờ robot rút hết trước lệnh đóng.",
            "en": "Open only when the opposite shutter is closed; hold it open for inspection and wait for full withdrawal before closing."
          }
        },
        {
          "title": {
            "vi": "Quan sát và ghi lại",
            "en": "Observe & record"
          },
          "text": {
            "vi": "GUI tách motion analysis, sequence, door detail và camera capture để đối chiếu hành vi của cùng engine.",
            "en": "The GUI separates motion analysis, sequences, shutter detail and camera capture to inspect the same engine."
          }
        }
      ],
      "evidence": {
        "vi": "Có ảnh CAD/mô phỏng, hai viewport cửa, đồ thị chuyển động, Camera QC và bảng trình tự. Đây không phải ảnh nguyên mẫu đã chế tạo; PASS/FAIL là kết quả QC mô phỏng được chọn.",
        "en": "Evidence includes CAD/simulation views, dual shutter viewports, motion plots, Camera QC and sequence tables. These are not photographs of a fabricated prototype; PASS/FAIL is a selected simulated QC outcome."
      },
      "limits": {
        "vi": "Chưa xác nhận toàn bộ cơ cấu nâng hạ, động lực học, phần cứng cảm biến/camera hoặc an toàn công nghiệp. Phạm vi hiện tại không hợp thức hóa các giao cắt của P09/P11 và không có thuật toán phát hiện lỗi giày bằng ảnh.",
        "en": "The full lift mechanism, dynamics, physical sensors/cameras and industrial safety are not validated. The selected scope does not legitimise P09/P11 clashes and contains no image-based shoe defect-detection algorithm."
      },
      "learnings": {
        "vi": "Ghi rõ nhóm nào được mô phỏng và nhóm nào chưa xác nhận giúp kết quả review có thể truy ngược tới hình học, thay vì chỉ dựa vào một animation trông hợp lý.",
        "en": "Explicit simulated and unvalidated groups make review results traceable to geometry rather than relying on an animation that merely looks plausible."
      },
      "gallery": [
        "shoe-overview",
        "shoe-inspection",
        "shoe-door-motion",
        "shoe-camera",
        "shoe-motion",
        "shoe-sequence"
      ],
      "chapters": [
        {
          "title": {
            "vi": "Bên trong khoang kiểm tra.",
            "en": "Inside the inspection chamber."
          },
          "text": {
            "vi": "Ảnh mở cửa giúp thấy quan hệ giữa khoang, chuyển động cửa và các asset DEMO.",
            "en": "The open-shutter view shows the chamber, shutter motion and separate DEMO assets."
          },
          "media": [
            "shoe-inspection"
          ],
          "layout": "wide"
        },
        {
          "title": {
            "vi": "Chuyển động phải đọc được.",
            "en": "Make motion inspectable."
          },
          "text": {
            "vi": "Chi tiết cửa và đồ thị trình bày phần chuyển động cùng phần cố định, không chỉ một ảnh phối cảnh.",
            "en": "Shutter detail and traces distinguish moving and fixed groups beyond a perspective render."
          },
          "media": [
            "shoe-door-motion",
            "shoe-motion"
          ],
          "layout": "wide"
        },
        {
          "title": {
            "vi": "Trình tự và đầu ra quan sát.",
            "en": "Sequence & observable outputs."
          },
          "text": {
            "vi": "Camera là khung nhìn mô phỏng; trạng thái và interlock được trình bày riêng để kiểm tra logic vận hành.",
            "en": "Camera views are simulated; state and interlock displays separately expose operating logic."
          },
          "media": [
            "shoe-camera",
            "shoe-sequence"
          ],
          "layout": "wide"
        }
      ]
    },
    {slug:'stewart-platform', name:bi('Robot cân bằng bóng', 'Ball-balancing robot'), subtitle:'Stewart Platform / Ball balancing', dates:'08/2024 — 05/2025', categories:['Robotics','Embedded'], tech:['MATLAB/Simulink','PD / PD-Fuzzy','LabVIEW','Arduino'], art:'stewart', status:bi('Dự án điều khiển · tư liệu CAD', 'Control project · CAD material'), image:null, video:null, repo:null, illustrationOnly:false,
      cover:'stewart-overview', gallery:['stewart-overview','stewart-detail'],
      shortDescription:bi('Cân bằng bóng bằng phản hồi camera, bộ điều khiển PD / PD-Fuzzy và cơ cấu song song Stewart.', 'Camera feedback, PD / PD-Fuzzy control and a Stewart parallel mechanism for ball balancing.'),
      overview:bi('Giữ bóng gần vị trí đặt trên một mặt bàn có thể nghiêng. Camera quan sát vị trí bóng; sai lệch so với mục tiêu được đưa về bộ điều khiển để điều chỉnh tư thế mặt bàn.', 'Keep a ball near a target on a tilting plate. A camera observes its position; the error relative to the target feeds a controller that adjusts the plate orientation.'),
      goal:bi('Bài toán kết nối nhận biết vị trí, phản hồi điều khiển và động học cơ cấu trong cùng một vòng kín.', 'The task connects position sensing, feedback control and mechanism kinematics in one closed loop.'),
      contribution:bi('Thực hiện dự án robot cân bằng bóng với MATLAB/Simulink, PD và PD-Fuzzy, camera, LabVIEW và Arduino.', 'Worked on a ball-balancing robot using MATLAB/Simulink, PD and PD-Fuzzy, a camera, LabVIEW and Arduino.'),
      system:bi('Camera → vị trí bóng → PD / PD-Fuzzy → Arduino → nền tảng Stewart.', 'Camera → ball position → PD / PD-Fuzzy → Arduino → Stewart platform.'),
      architecture:['Camera','Ball position','PD / PD-Fuzzy','Arduino','Stewart Platform'],
      approach:[
        {title:bi('Quan sát vị trí bóng', 'Observe the ball'),text:bi('Lấy vị trí bóng từ ảnh và đối chiếu với điểm đặt để hình thành sai lệch điều khiển.', 'Obtain the ball position from the image and compare it with the target to form the control error.')},
        {title:bi('Điều khiển mặt bàn', 'Control the plate'),text:bi('Dùng PD / PD-Fuzzy trong phạm vi dự án để liên hệ sai lệch vị trí với yêu cầu nghiêng mặt bàn.', 'Use PD / PD-Fuzzy within the project scope to relate position error to the requested plate tilt.')},
        {title:bi('Cơ cấu song song', 'Parallel mechanism'),text:bi('Các nhánh cùng nối đế với mặt bàn động. Động học nghịch liên hệ tư thế đặt với chuyển động tương ứng của từng nhánh.', 'Multiple chains connect the base to the moving plate. Inverse kinematics relates a requested pose to the corresponding motion of each chain.')}
      ],
      chapters:[{title:bi('Một mặt bàn. Nhiều nhánh phối hợp.', 'One plate. Coordinated motion.'),text:bi('Hai render CAD giúp nhìn rõ mặt bàn, khớp và kết cấu truyền động của hệ.', 'Two CAD renders show the plate, joints and actuation structure.'),media:['stewart-overview','stewart-detail'],layout:'pair'}],
      evidence:bi('Đã có hai render CAD trong bộ tư liệu và phạm vi công nghệ của dự án. Nội dung trình bày nguyên lý cân bằng bóng và cấu trúc điều khiển tổng quát.', 'Two CAD renders and the project technology scope are available. The case study describes the ball-balancing principle and general control structure.'),
      limits:bi('Chưa có video chạy, đồ thị đáp ứng hoặc số liệu sai số để công bố độ chính xác và so sánh PD với PD-Fuzzy.', 'No run video, response plots or error measurements are available to report accuracy or compare PD with PD-Fuzzy.'),
      references:[{label:'MathWorks — Stewart Platform',url:'https://www.mathworks.com/help/sm/ug/stewart-platform.html'}]
    },
    {slug:'micromouse', name:bi('Micromouse', 'Micromouse'), subtitle:bi('Robot giải mê cung', 'Maze-solving robot'), dates:'10/2024 — 12/2024', categories:['Robotics','Embedded'], tech:['Flood Fill','Motor Control','Sensors','Bluetooth'], art:'mouse', status:bi('Dự án robot · CAD & tư liệu hệ thống', 'Robotics project · CAD & system material'), image:null, video:null, repo:null, illustrationOnly:false,
      cover:'mouse-overview',gallery:['mouse-overview','mouse-detail','mouse-reference'],
      shortDescription:bi('Từ cảm biến tường đến bản đồ ô lưới, Flood Fill và điều khiển chuyển động trong mê cung.', 'From wall sensors to a grid map, Flood Fill and motion control inside a maze.'),
      overview:bi('Robot tự quan sát các vách tường, cập nhật thông tin mê cung và chọn hướng di chuyển. Khối tìm đường cần phối hợp với điều khiển bánh xe để biến quyết định trên bản đồ thành chuyển động ổn định trong hành lang hẹp.', 'The robot observes walls, updates maze information and chooses its next direction. Planning must work with wheel control to turn map decisions into stable movement through narrow corridors.'),
      goal:bi('Liên kết thông tin tường, vị trí trên bản đồ và điều khiển động cơ; phân biệt bài toán tìm đường với khả năng bám tường của robot.', 'Connect wall information, map position and motor control; distinguish route planning from the robot’s wall-following behaviour.'),
      contribution:bi('Thực hiện thuật toán Flood Fill, bám tường, điều khiển động cơ, cảm biến và Bluetooth.', 'Worked on Flood Fill, wall following, motor control, sensors and Bluetooth.'),
      system:bi('Cảm biến → thông tin tường → bản đồ / Flood Fill → chuyển động → động cơ.', 'Sensors → wall information → map / Flood Fill → motion → motors.'),
      architecture:['Wall sensors','Maze map','Flood Fill','Motion control','Wheel motors'],
      approach:[
        {title:bi('Đọc môi trường gần', 'Sense nearby walls'),text:bi('Thông tin tường phía trước và hai bên cung cấp đầu vào cho quyết định chuyển ô và hiệu chỉnh hướng chạy.', 'Front and side wall information informs cell transitions and heading corrections.')},
        {title:bi('Lập bản đồ và chọn đường', 'Map and plan'),text:bi('Flood Fill sử dụng bản đồ ô lưới để chọn ô kế tiếp hướng tới đích, cập nhật khi có thông tin tường mới.', 'Flood Fill uses a cell grid to select a next cell towards the goal, updating as new wall information becomes available.')},
        {title:bi('Điều khiển cấp thấp', 'Low-level control'),text:bi('Bám tường và điều khiển động cơ thực hiện các đoạn đi thẳng, dừng và rẽ; Bluetooth phục vụ kết nối trong phạm vi dự án.', 'Wall following and motor control execute straight segments, stops and turns; Bluetooth provides connectivity within the project scope.')}
      ],
      chapters:[
        {title:bi('Nhỏ gọn ở phần cứng. Rõ ràng ở luồng xử lý.', 'Compact hardware. A clear processing loop.'),text:bi('CAD và hình phần cứng trong bộ tư liệu thể hiện nền tảng di động, bo mạch và các nhóm cảm biến.', 'CAD and hardware images in the supplied material show the mobile platform, circuit boards and sensor groups.'),media:['mouse-overview','mouse-detail'],layout:'editorial'},
        {title:bi('Cảm biến nối robot với bản đồ.', 'Sensors connect the robot to its map.'),text:bi('Hình UKMARSBOT được giữ làm tham chiếu kiến trúc: bo mạch chính, cảm biến tường và truyền động.', 'The UKMARSBOT image is retained as an architecture reference: main board, wall sensors and drive system.'),media:['mouse-reference'],layout:'wide'}
      ],
      evidence:bi('Bộ ảnh được cung cấp gồm CAD và hình tham chiếu nền tảng/bo mạch. Nội dung cá nhân giữ phạm vi Flood Fill, bám tường, cảm biến, động cơ và Bluetooth đã nêu.', 'The supplied images include CAD and platform/board reference views. The personal work description retains the provided scope of Flood Fill, wall following, sensing, motors and Bluetooth.'),
      limits:bi('Chưa có log chạy mê cung, video hoặc số đo thời gian để xác nhận tốc độ, độ tin cậy hay kết quả thi đấu. Ảnh UKMARSBOT không được dùng để khẳng định tự thiết kế toàn bộ phần cứng.', 'No maze-run logs, video or timing measurements are available to establish speed, reliability or competition results. The UKMARSBOT reference does not imply that all hardware was designed from scratch.'),
      references:[{label:'UKMARS — Wall Follower',url:'https://ukmars.org/contests/wall-follower/'},{label:'UKMARS — UKMARSBOT Mazerunner',url:'https://ukmars.org/2021/05/ukmarsbot-mazerunner/'}]
    }
  ];
  const OBJECTS = [
    {id:'esp32', name:'ESP32', art:'esp32', label:bi('Bộ điều khiển nhúng','Embedded controller'), desc:bi('Đầu vào cảm biến và điều khiển cấp thấp. Liên hệ kỹ năng hệ thống nhúng, C/C++ và ESP32/STM32.', 'Sensor input and low-level control. Related skills: embedded systems, C/C++ and ESP32/STM32.'), project:null},
    {id:'pi', name:'Raspberry Pi', art:'pi', label:bi('Máy tính trên robot','Onboard computing'), desc:bi('Nhận thức môi trường và phần mềm robotics. Raspberry Pi 5 là nền tảng của dự án xe tự hành ROS2.', 'Perception and robotics software. Raspberry Pi 5 is the computing platform for the ROS2 autonomous vehicle.'), project:'ros2-autonomous-vehicle'},
    {id:'camera', name:bi('Camera','Camera'), art:'camera', label:bi('Thị giác robot','Robot vision'), desc:bi('Đầu vào hình ảnh cho nhận thức. Liên hệ OpenCV, YOLO và các dự án xe tự hành, cân bằng bóng.', 'Visual input for perception. Related to OpenCV, YOLO, the autonomous vehicle and ball-balancing projects.'), project:'ros2-autonomous-vehicle'},
    {id:'motor', name:'DM4310 V3', art:'motor', label:bi('Động cơ robot','Robot actuator'), desc:bi('Minh họa động cơ. Tư liệu DM4310 V3 mô tả Position/Jog qua USB2CAN và GUI DemoBus; case study ghi rõ nguồn feedback.', 'Actuator illustration. The DM4310 V3 material describes Position/Jog over USB2CAN and a DemoBus GUI; the case study identifies the feedback source.'), project:'damiao-motor-control'},
    {id:'encoder', name:'Encoder', art:'encoder', label:bi('Phản hồi chuyển động','Motion feedback'), desc:bi('Minh họa nguyên lý phản hồi vị trí, liên hệ với hướng quan tâm Motion Control và kỹ năng PID/PD.', 'Illustration of position feedback, related to Motion Control interests and PID/PD skills.'), project:null},
    {id:'pcb', name:'PCB', art:'pcb', label:bi('Kết nối phần cứng','Hardware connections'), desc:bi('Minh họa bảng mạch kết nối cảm biến và cơ cấu chấp hành trong hệ thống nhúng.', 'Illustration of a circuit board connecting sensors and actuators in an embedded system.'), project:null},
    {id:'oled', name:bi('Robot OLED','OLED robot'), art:'oled', label:bi('Giao diện biểu cảm','Expressive interface'), desc:bi('Minh họa một robot tương tác nhỏ; hướng quan tâm, không phải dự án cá nhân đã hoàn thành.', 'Illustration of a small interactive robot; an area of interest, not a completed personal project.'), project:null},
    {id:'gear', name:bi('Bánh răng','Gear'), art:'gear', label:bi('Truyền động cơ khí','Mechanical transmission'), desc:bi('Minh họa truyền chuyển động, liên hệ hướng Mechanical Prototyping và kỹ năng SolidWorks.', 'A motion-transmission illustration, related to Mechanical Prototyping and SolidWorks skills.'), project:null},
    {id:'arm', name:'OpenArm', art:'arm', image:'arm', label:bi('Động học & điều khiển','Kinematics & control'), question:bi('Làm thế nào để một khớp chuyển động chính xác và cả cánh tay phối hợp nhịp nhàng?','How can precise joints become a coordinated arm?'), desc:bi('Tôi quan tâm đến cánh tay robot mở: từ cơ cấu khớp quay, bộ truyền động đến vòng điều khiển và giao tiếp CAN. OpenArm là điểm nối giữa nghiên cứu động cơ Damiao và thiết kế một hệ thao tác có thể mở rộng.','I am interested in open robotic arms: rotary joints, actuators, control loops and CAN communication. OpenArm connects my Damiao actuator research with the architecture of an extensible manipulation system.'), focus:bi(['Động học thuận/nghịch và giới hạn chuyển động của từng khớp.','Phản hồi vị trí, vận tốc, dòng điện và điều khiển mô-men.','Tích hợp cơ khí, dây dẫn và phần mềm điều khiển.'],['Forward/inverse kinematics and joint motion limits.','Position, velocity and current feedback; torque control.','Integration of mechanics, cabling and control software.']), tech:['CAN bus','Damiao','Kinematics','ROS2'], source:{name:'OpenArm / Enactic',url:'https://github.com/enactic/openarm_description'}, project:'damiao-motor-control'},
    {id:'car', name:bi('Xe tự hành','Autonomous vehicle'), art:'car', image:'car', label:bi('Robot di động','Mobile robotics'), question:bi('Từ một khung hình camera, robot quyết định đi đâu tiếp theo?','How does a camera frame become the next driving decision?'), desc:bi('Hướng nghiên cứu của tôi là nối nhận thức thị giác với chuyển động: camera quan sát mặt đường, phần mềm ROS2 xử lý trạng thái và bộ điều khiển bám quỹ đạo. Đây cũng là hướng phát triển từ dự án xe Raspberry Pi 5 trên sa bàn đô thị.','My focus is connecting visual perception with motion: a camera observes the road, ROS2 processes state, and a controller follows the trajectory. This builds on my Raspberry Pi 5 vehicle project on an urban model.'), focus:bi(['Nhận diện làn đường, biển báo và vùng có thể di chuyển.','Biến đổi phối cảnh IPM để quan sát mặt đường.','Phối hợp cảm biến, truyền thông và vòng điều khiển.'],['Lane, traffic-sign and traversable-area perception.','Inverse perspective mapping for a road-plane view.','Coordination of sensors, communication and control loops.']),tech:['ROS2','Raspberry Pi 5','OpenCV','YOLO'],project:'ros2-autonomous-vehicle'},
    {id:'humanoid', name:'Humanoid / G1', art:'humanoid', image:'humanoid', label:bi('Toàn thân & thăng bằng','Whole-body balance'), question:bi('Điều gì giúp nhiều khớp cùng giữ cơ thể cân bằng?','What lets many joints keep a whole body in balance?'), desc:bi('Robot dạng người mở ra bài toán phối hợp toàn thân: hình học cơ cấu, cảm nhận trạng thái và tiếp xúc với mặt đất. Tôi muốn tìm hiểu cách một hệ nhiều bậc tự do chuyển từ tư thế đứng sang những thao tác có chủ đích.','Humanoids bring together mechanism geometry, state estimation and ground contact. I want to understand how a system with many degrees of freedom moves from standing balance to purposeful manipulation.'), focus:bi(['Cấu trúc khớp và chuỗi động học tay, chân, thân.','Tâm khối lượng, vùng đỡ và trạng thái tiếp xúc.','Mô phỏng trước khi thử nghiệm chính sách chuyển động.'],['Joint structure and arm, leg and torso kinematic chains.','Centre of mass, support regions and contact state.','Simulation before testing motion policies.']),tech:['Whole-body control','Simulation','State estimation'],source:{name:'Unitree G1 / Unitree Robotics',url:'https://github.com/unitreerobotics/unitree_ros/tree/master/robots/g1_description'},project:null},
    {id:'hexapod', name:'Hexapod', art:'hexapod', image:'hexapod', label:bi('Robot đa chân','Legged locomotion'), question:bi('Sáu chân chia sẻ trọng lượng và chọn điểm đặt chân như thế nào?','How do six legs share load and choose their footholds?'), desc:bi('Tôi quan tâm đến robot sáu chân vì mối liên hệ trực tiếp giữa hình học cơ cấu và chuyển động. Cấu trúc ba khớp mỗi chân cho phép nghiên cứu động học, chu kỳ bước và độ ổn định trên nhiều bề mặt.','Six-legged robots make the relationship between mechanism geometry and motion tangible. Three joints per leg provide a useful architecture for exploring kinematics, gait cycles and stability across different surfaces.'),focus:bi(['Động học từng chân với các khớp coxa, femur và tibia.','Dáng đi tripod, pha nâng chân và pha chống.','Phân phối tải và điều chỉnh vị trí thân robot.'],['Coxa, femur and tibia joint kinematics.','Tripod gait, swing phase and stance phase.','Load distribution and body-position adjustment.']),tech:['Inverse kinematics','Gait planning','Servo control'],project:null},
    {id:'stewart', name:'Stewart Platform', art:'stewart', image:'stewart', label:bi('Điều khiển song song','Parallel mechanisms'), question:bi('Sáu nhánh truyền động phối hợp để giữ một quả bóng ở giữa ra sao?','How can six actuated branches keep a ball centred?'), desc:bi('Một cơ cấu song song nối sáu nhánh giữa đế và bàn động. Tôi quan tâm đến cách chuyển sai lệch vị trí bóng thành góc nghiêng của bàn, rồi thành lệnh cho các servo — kết nối thị giác với điều khiển PD và PD-Fuzzy.','Six branches connect a fixed base to a moving platform. My interest is turning ball-position error into platform tilt and then servo commands, connecting visual feedback with PD and PD-Fuzzy control.'),focus:bi(['Động học nghịch cơ cấu song song và hành trình servo.','Ước lượng vị trí bóng từ camera.','Đáp ứng quá độ, dao động và tinh chỉnh bộ điều khiển.'],['Parallel-mechanism inverse kinematics and servo travel.','Camera-based ball-position estimation.','Transient response, oscillation and controller tuning.']),tech:['PD / PD-Fuzzy','MATLAB','Vision feedback'],project:'stewart-platform'},
    {id:'chatbot', name:'Chatbot / RAG', art:'oled', image:'chatbot', label:bi('Tri thức & tương tác','Knowledge & interaction'),question:bi('Làm sao để câu trả lời bám sát tài liệu và có thể kiểm chứng?','How can an answer stay grounded in verifiable documents?'),desc:bi('Tôi muốn xây dựng giao diện hội thoại hữu ích cho các hệ kỹ thuật: tìm đúng tài liệu, lấy đúng ngữ cảnh và trình bày câu trả lời có nguồn. Hướng này nối trải nghiệm chatbot RAG với cách người dùng tìm hiểu một hệ robot.','I want to build useful conversational interfaces for technical systems: retrieve the right documents, select relevant context and present answers with sources. This connects my RAG chatbot experience with the way people learn about a robotic system.'),focus:bi(['Chuỗi xử lý tài liệu, chia đoạn, lập chỉ mục và truy xuất.','Thiết kế ngữ cảnh, dẫn nguồn và xử lý khi thiếu thông tin.','Tích hợp hội thoại vào công cụ hỗ trợ người dùng.'],['Document ingestion, chunking, indexing and retrieval.','Context design, citations and handling missing information.','Conversational interfaces for user-support tools.']),tech:['RAG','Python','MongoDB','PostgreSQL'],experience:true,project:null},
    {id:'edge-ai', name:'Edge AI', art:'pi', image:'edge-ai', label:bi('AI trên thiết bị','On-device intelligence'),question:bi('Một mô hình AI cần gì để hoạt động cùng phần cứng thật?','What does an AI model need to work with real hardware?'),desc:bi('Từ mô hình đến hệ thống chạy được còn có camera, tài nguyên tính toán, luồng dữ liệu và giao diện giám sát. Tôi quan tâm đến triển khai nhận thức trên Jetson và Raspberry Pi để đưa kết quả AI đến gần nơi robot hoạt động.','Between a model and a working system sit cameras, computing resources, data pipelines and monitoring interfaces. I am interested in deploying perception on Jetson and Raspberry Pi, close to where a robot operates.'),focus:bi(['Chuẩn bị đầu vào và tối ưu luồng xử lý hình ảnh.','Quản lý tài nguyên thiết bị, phụ thuộc và môi trường chạy.','Kết nối kết quả suy luận với ứng dụng và bộ điều khiển.'],['Input preparation and image-processing pipelines.','Device resources, dependencies and runtime environments.','Connecting inference outputs to applications and controllers.']),tech:['Jetson Nano','Raspberry Pi','Linux','Docker'],experience:true,project:null},
    {id:'vision', name:bi('Thị giác máy tính','Computer vision'), art:'camera', image:'vision',label:bi('Nhận thức & kiểm tra','Perception & inspection'),question:bi('Làm sao biến ánh sáng và điểm ảnh thành một phép kiểm tra đáng tin cậy?','How do light and pixels become a dependable inspection?'),desc:bi('Thị giác bắt đầu từ cách đặt camera, chiếu sáng và cố định vật thể. Tôi quan tâm đến trạm kiểm tra kết hợp cơ khí và xử lý ảnh, nơi góc nhìn ổn định giúp phần mềm nhận diện đặc trưng rõ ràng hơn.','Vision starts with camera placement, lighting and how an object is held. I am interested in inspection stations that combine fixtures and image processing, where a consistent view helps software identify features reliably.'),focus:bi(['Camera, ống kính, trường nhìn và vùng kiểm tra.','Chiếu sáng có kiểm soát, đồ gá và độ lặp lại vị trí.','Phát hiện đối tượng, xử lý ảnh và giao diện quan sát.'],['Camera, lens, field of view and inspection regions.','Controlled lighting, fixtures and repeatable positioning.','Object detection, image processing and monitoring interfaces.']),tech:['OpenCV','YOLO','Lighting','SolidWorks'],project:'smartwatch-vision-station'}
  ];
  return {PROFILE, ASSETS, MOTION, EXPERIENCES, PROJECTS, OBJECTS};
})();
