# blueDStar — Nguyễn Văn Đạt

Portfolio về Robotics R&D, hệ thống nhúng, điều khiển và thị giác máy tính.

**Website:** https://bluedstar.github.io/portfolio_contactwork/

**Repository:** https://github.com/blueDstar/portfolio_contactwork

Website chạy bằng HTML/CSS/JavaScript tĩnh, không cần backend hoặc bước build. Có giao diện VI/EN, sáu case study, gallery/lightbox, bộ góc CAD Vision Station và hộp thoại Chat chờ tích hợp model.

**Studio tương tác:** https://bluedstar.github.io/portfolio_contactwork/#/studio

Studio có ba góc nhìn, mỗi lần chỉ hiển thị một lớp:

- **Cánh tay máy:** mô hình 3D khớp nối, ba thanh chỉnh góc, các tư thế đặt sẵn, chu kỳ chuyển động chủ động và vị trí TCP theo đơn vị minh họa.
- **Mặt cắt cơ cấu:** mô hình truyền động nguyên lý với mặt cắt vỏ và tách cụm theo trục. Đây là hình học tự dựng, không phải CAD DM4310; các góc CAD dự án thật vẫn nằm trong case study Vision Station.
- **Thị giác robot:** khung camera trích bằng viewport CSS từ ảnh dashboard ROS2 và ảnh IPM trong tư liệu dự án, có xem màu nhãn gốc. Đây là ảnh đã ghi, không phải inference/camera live.

Home giữ các câu hỏi dẫn vào Studio; phần nét vẽ đã được bỏ. THE QUESTION và ba Field Notes vẫn nối tư duy nghiên cứu với các dự án thật.

Mô hình đứng yên mặc định. Bấm **Chạy chu kỳ** để chuyển động; **Xoay góc nhìn 3D** bật kéo/xoay và pinch. Tắt Xoay để cuộn dọc bình thường trên mô hình ở điện thoại. Three.js 0.186.1 được lưu cục bộ và chỉ tải khi cần 3D, không gọi CDN. Thiết bị thiếu WebGL 2 vẫn xem được ảnh dự án và mục Thị giác. Mô hình chưa xét động lực học, va chạm hoặc giới hạn motor.

Nút kính lúp hoặc phím `/`, `Ctrl/Cmd+K` mở tìm kiếm dự án, công nghệ và trang. Tìm tiếng Việt có hoặc không dấu; dùng mũi tên, Enter và Escape. Case study có mục lục cố định và vạch tiến độ đọc. Đổi sang chế độ giảm chuyển động sẽ dừng chu kỳ đang chạy.

## Chạy cục bộ

Tại thư mục chứa `index.html`:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Mở http://127.0.0.1:4173/. Dừng server bằng `Ctrl+C`. Nên dùng HTTP thay cho `file://`.

## Các file chính

- `index.html`: shell, metadata, điều hướng và dialog.
- `styles.css`, `media.css`, `enhancements.css`: giao diện, ảnh responsive và chuyển động.
- `data.js`: hồ sơ, học vấn, kinh nghiệm, dự án và liên kết.
- `media.js`: 37 mục media với đường dẫn, kích thước, srcset, alt/caption VI/EN.
- `app.js`: hash router, ngôn ngữ, timeline, lọc dự án và nội dung trang.
- `studio.js`, `studio.css`: nội dung Studio, Field Notes, tìm kiếm và mục lục case study. Sửa các ghi chú song ngữ trong mảng `notes`; giữ slug/ID ảnh trỏ tới dự án và media thật.
- `robotics-lab.js`, `robotics-lab.css`: renderer 3D tải khi cần, hình học nguyên lý của tay máy/cơ cấu, điều khiển khớp, mặt cắt và viewport camera. `state` trong `studio.js` giữ góc nhìn và các lựa chọn khi đổi VI/EN.
- `assets/vendor/three/`, `THIRD_PARTY_NOTICES.md`: thư viện Three.js đã ghim phiên bản và giấy phép MIT. Không sửa thư viện để chỉnh mô hình; sửa `robotics-lab.js`.
- `gallery.js`: góc CAD, lightbox, bàn phím và vuốt.
- `illustrations.js`: minh họa SVG các robot/linh kiện.
- `chat.js`: giao diện Chat và adapter để tích hợp model sau này.
- `assets/`: 148 WebP của 35 ảnh/render và hai logo, cùng favicon.
- `.nojekyll`: phục vụ website tĩnh trực tiếp trên GitHub Pages.

Các ghi chú nội bộ, ảnh QA, thư mục nguồn và công cụ xử lý ảnh không được đưa vào repository công khai. Tài liệu bảo trì chi tiết vẫn có trong workspace cục bộ ở `docs/local-maintenance.md`.

## Sửa nội dung

Chỉnh `PROFILE`, `EXPERIENCES`, `PROJECTS` và `ASSETS` trong `data.js`. Chuỗi song ngữ dùng `{vi: '...', en: '...'}`. Giữ `repo`, `video`, `cvVI`, `cvEN` là `null` khi chưa có file hoặc URL thật.

Một dự án có ảnh dùng `cover` và `gallery` tham chiếu ID trong `media.js`. Các phần mô tả gồm `overview`, `goal`, `contribution`, `architecture`, `approach`, `chapters`, `evidence`, `limits`. Chỉ thêm `views` khi các góc là cùng phiên bản CAD.

## Thay ảnh

1. Đặt ảnh WebP đã tối ưu trong `assets/portraits/`, `assets/companies/` hoặc `assets/projects/<project>/`.
2. Cập nhật đường dẫn, `width`, `height`, `srcset`, `variants`, alt/caption VI/EN trong `media.js`.
3. Giữ ID hiện tại nếu muốn thay ảnh mà không đổi template. `ASSETS` trong `data.js` chọn các ảnh cá nhân.
4. Giữ `height: auto` cho ảnh studio để ảnh co đồng thời hai chiều và không xuất hiện nền đệm. Khi đổi tỷ lệ Hero, cập nhật tỷ lệ giới hạn 1024/956 ở cuối `enhancements.css`.
5. Kiểm tra lại ảnh ở 320/375px, khoảng 714px, laptop và desktop; giữ rõ mặt, kính và tay.

GUI giữ màu trong nội dung; cover mặc định đơn sắc và lên màu khi hover/focus. Gallery tải bản full khi mở lightbox; viewport camera của Studio dùng bản full để trích đúng khung hình. Không thay số/chữ trong screenshot hoặc tạo thông số thử nghiệm chưa có nguồn. Khi thay ảnh dashboard của Studio, cập nhật tỷ lệ/offset viewport trong `robotics-lab.css` theo bố cục nguồn mới.

## Thêm CV

Đặt PDF thật tại `assets/cv-vi.pdf`, `assets/cv-en.pdf`, rồi sửa `ASSETS`:

```javascript
cvVI: './assets/cv-vi.pdf',
cvEN: './assets/cv-en.pdf'
```

Hiện CV chưa được gắn; giao diện thông báo rõ thay vì tạo link hỏng.

## Tích hợp chatbot sau này

Mặc định hộp thoại ghi “Chatbot đang được chuẩn bị”, ô nhập và Gửi vô hiệu. Chưa có model, API call hoặc câu trả lời giả.

Sau khi có adapter của bạn, gọi sau `chat.js`:

```javascript
window.blueDStarChat.connect(async ({message, history, language}) => {
  return await yourChatAdapter({message, history, language});
});
```

Adapter trả chuỗi hoặc `{text: '...'}`. Lịch sử chỉ nằm trong bộ nhớ trang; `disconnect()` đưa giao diện về trạng thái chờ. `yourChatAdapter` là hàm cần bổ sung. Giữ API key ở dịch vụ của bạn khi tích hợp model qua mạng.

## Cập nhật GitHub Pages

GitHub Pages phục vụ branch `main`, thư mục `/(root)`. Website dùng đường dẫn tương đối và route dạng `#/work/<slug>`, nên mở trực tiếp, refresh và Back/Forward không cần cấu hình rewrite máy chủ.

Sau khi sửa và kiểm tra:

```powershell
git add index.html app.js studio.js studio.css robotics-lab.js robotics-lab.css data.js media.js gallery.js chat.js illustrations.js styles.css media.css enhancements.css assets README.md THIRD_PARTY_NOTICES.md .gitignore .nojekyll
git commit -m "Update portfolio"
git push origin main
```

GitHub Pages tự xuất bản commit mới. Có thể xem trạng thái tại tab Actions và Settings → Pages trong repository. Không cần mua tên miền, CDN hoặc dịch vụ backend cho bản hiện tại.
