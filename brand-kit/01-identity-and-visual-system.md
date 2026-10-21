# 01 / Định vị và hệ thống thị giác

## 1. Ý tưởng thương hiệu

**blueDStar là một studio nghiên cứu cá nhân tại giao điểm của robot, phần cứng và nghệ thuật quan sát.**

Người xem nên cảm nhận được ba điều:

1. **Tò mò:** bắt đầu bằng câu hỏi cụ thể về một cơ cấu, dữ liệu hoặc chuyển động.
2. **Có nền tảng kỹ thuật:** hình học, thuật ngữ và phạm vi công việc có thể đối chiếu.
3. **Có thẩm mỹ:** ít yếu tố, khoảng trống rộng, ánh sáng có chủ đích, chữ tạo nhịp đọc.

Từ khóa thiết kế: monochrome, editorial, research studio, mechanical detail, quiet motion, human presence. Khi cần diễn đạt bằng tiếng Việt: **đơn sắc / biên tập / nghiên cứu / cơ cấu / chuyển động tiết chế / dấu ấn cá nhân**.

## 2. Tên, wordmark và câu dẫn

- Viết **blueDStar** trong wordmark, bio, credit và tên series. Giữ chữ D và S viết hoa.
- Dùng **NGUYỄN VĂN ĐẠT** cho tên tác giả; dùng **Nguyễn Văn Đạt** trong văn xuôi.
- Wordmark là chữ sans đậm, tracking chặt; không kéo giãn ngang hoặc biến đổi tỷ lệ từng chữ.
- Để khoảng trống tối thiểu xung quanh wordmark bằng chiều cao chữ thường `e` của chính wordmark đó.
- Trên ảnh sáng dùng wordmark đen; trên nền tối dùng màu ngà.
- Dấu sao tám tia trong bộ icon là một chi tiết đồ họa nghiên cứu. Dùng nhỏ, tối đa một lần mỗi khung; wordmark vẫn là nhận diện chính.

Câu dẫn đang dùng trên website:

> Tôi tạo nên những chuyển động.

Câu dẫn mở rộng cho social:

> Quan sát. Đặt câu hỏi. Chế tạo. Cải tiến.

Bản tiếng Anh gợi ý: **Observe. Question. Build. Refine.**

## 3. Màu sắc

| Token | HEX | Vai trò |
| --- | --- | --- |
| Ink | `#0B0B0B` | Nền chính, chữ trên nền sáng |
| Surface | `#141414` | Panel, vùng phân lớp kín đáo |
| Paper | `#F3F0E9` | Chữ chính, nền sáng chủ đạo |
| Muted | `#A5A5A5` | Chú thích, thông tin thứ cấp |
| Line | `#303030` | Đường chia, lưới, viền phụ |
| Soft paper | `#EEEAE4` | Nút sáng, chi tiết nhẹ |
| Silver | `#B9B7B2` | Từ nhấn nghiêng hoặc chi tiết kim loại |

Tỷ lệ để bắt đầu một layout: khoảng **75–85% nền tối**, **10–20% ảnh/kim loại/chữ ngà**, phần còn lại cho đường chia và chú thích. Đây là cách cân bố cục, không cần đo từng pixel.

Nền sáng có thể dùng cho CV, sơ đồ hoặc một khung giải thích. Đặt chữ đen rõ ràng, giữ cùng font và nhịp khoảng cách. Tránh chuyển giữa nhiều nền khác màu trong cùng carousel.

Màu gốc trong GUI, đồ thị, nhãn segmentation và ảnh thí nghiệm được giữ khi màu đó mang thông tin. Có thể dùng ảnh đơn sắc cho bìa, rồi đưa ảnh gốc có chú thích vào slide bằng chứng. Không sửa màu nhãn hoặc nội dung screenshot để làm đẹp.

## 4. Chữ và phân cấp

Website dùng **Arial / Segoe UI / sans-serif** cho nội dung và **Consolas / Liberation Mono / monospace** cho nhãn kỹ thuật. Đây cũng là lựa chọn mặc định của các SVG. Giữ dấu tiếng Việt và kiểm tra font thay thế khi nhập vào phần mềm thiết kế.

| Cấp | Cách dùng | Khung 1080px rộng |
| --- | --- | --- |
| Wordmark | Sans bold, tracking chặt | 70–96px |
| Tiêu đề bìa | Sans regular/bold, 2–4 dòng | 72–100px |
| Từ nhấn | Italic, cùng họ chữ, dùng một cụm | Bằng tiêu đề |
| Nội dung | Sans regular, câu ngắn | 32–42px |
| Nhãn / số mục | Mono, chữ hoa, tracking nhẹ | 20–26px |
| Chú thích | Sans hoặc mono | 22–28px |

Các cỡ trên là điểm khởi đầu cho canvas 1080px, sau đó kiểm tra ở chiều rộng khoảng 360px. Với khung nhiều chữ, tách thành slide thay vì giảm chữ liên tục. Chừa line-height khoảng 1.05–1.15 cho tiêu đề và 1.4–1.6 cho đoạn văn.

Tối đa hai họ chữ trong một bộ nội dung. Dùng italic để nhấn một ý như *một câu hỏi*, không nghiêng cả bài. Chữ hoa phù hợp với nhãn ngắn; câu giải thích nên giữ kiểu chữ thông thường.

## 5. Lưới và bố cục

- Canvas dọc 1080px: lề tham chiếu **72px**, chia 6 cột; khoảng cách bước **8px**.
- Khoảng cách ưu tiên: 8 / 16 / 24 / 32 / 48 / 72 / 96px.
- Trên bìa, dùng một trục căn trái; có thể đặt mã mục hoặc mũi tên ở mép phải.
- Đường chia 1–2px, màu Line hoặc Muted giảm độ nổi. Không dùng đường chia xuyên qua gương mặt, tay hoặc chi tiết cơ cấu cần đọc.
- Một hình chính có diện tích đủ lớn. Chi tiết phụ chỉ xuất hiện khi giúp giải thích hình chính.
- Vùng chân khung nên có tên series, số trang hoặc CTA; giữ mỗi mục ngắn.
- Chừa vùng trống trên/dưới nội dung dọc để thích nghi với thanh giao diện khi đăng lên ứng dụng. Kiểm tra bằng bản xem trước của ứng dụng trước khi xuất bản.

Ba canvas của bộ này:

| Preset | Kích thước | Ứng dụng thiết kế |
| --- | --- | --- |
| Feed / project | 1080 × 1350, 4:5 | Bìa dự án, carousel, ghi chú nghiên cứu |
| Story / question | 1080 × 1920, 9:16 | Câu hỏi, video dọc, hậu trường |
| Research cover | 1600 × 900, 16:9 | Bìa video, bài viết, slide mở đầu |

Đây là preset nội bộ; điều chỉnh crop theo nơi đăng. Khi chuyển tỷ lệ, bố trí lại chữ và hình thay vì kéo giãn toàn bộ bản thiết kế.

## 6. Ảnh con người

Phong cách ảnh: studio trắng, trang phục tối, ánh sáng mềm, nét mặt tự nhiên, đủ khoảng trống để đặt chữ. Đen trắng cần còn chi tiết tóc, kính, bàn tay và chất liệu áo.

**Giữ tỷ lệ gốc của ảnh.** Thu phóng đồng thời ngang và dọc. Không thêm dải nền xám/trắng để ép vào một khung cao; không kéo dài người; không cắt mặt hoặc tay để làm vừa layout. Khi muốn giữ trọn ảnh, đổi bố cục xung quanh ảnh.

Nếu dùng ảnh tách nền, viền tóc và kính cần sạch, ánh sáng phải hợp với nền. Chọn tách nền có chủ đích cho một bố cục cụ thể; ảnh studio nguyên bản vẫn là lựa chọn chuẩn. Chỉ dùng tư liệu đã được chủ ảnh đồng ý.

## 7. Robot, CAD và bằng chứng

- Ưu tiên CAD/project screenshot/ảnh thật có liên hệ trực tiếp với nội dung.
- Hình cơ khí cần có khớp, gối đỡ, truyền động, hướng trục và điểm gắn hợp lý. Lưới mặt đất nhẹ giúp đọc không gian.
- Vật liệu: kim loại xám, cao su tối, nhựa kỹ thuật trung tính; ánh sáng mềm, một điểm nhấn cạnh. Giữ tỷ lệ đúng của chi tiết.
- Mặt cắt nên giải thích một quan hệ: vỏ–ổ bi–trục, camera–vật thể–đồ gá, hoặc cảm biến–điều khiển–chấp hành.
- Khi dùng ảnh mô phỏng, gọi đúng là mô phỏng. Khi chưa có số đo, diễn đạt câu hỏi hoặc hướng thử nghiệm tiếp.
- Giữ nguyên chữ, số, đồ thị và trạng thái trong GUI. Crop để đọc được; thêm chú thích bên ngoài ảnh.
- Khi tái sử dụng hình học OpenArm/G1 từ portfolio, mang theo credit nguồn trong tài liệu giấy phép của website.

## 8. Icon

Hệ icon: **SVG 24 × 24**, nét **1.5**, đầu và góc bo nhẹ, `fill="none"`, màu đi theo chữ. Dùng kích thước hiển thị 16–24px trên web; trên canvas 1080px có thể dùng 28–40px.

Mũi tên chéo gợi mở / chuyển trang; mũi tên xuống gợi tải; dấu cộng gợi mở rộng; dấu sao gợi một ghi chú. Giữ ý nghĩa nhất quán giữa các post và website.

Dùng file trong `icons/` hoặc hàm `WorkshopIcons.svg()` của website. Ký tự mũi tên chéo và dấu sao tám tia có cả cách trình bày dạng chữ và emoji trong [bảng Unicode](https://unicode.org/emoji/charts-15.1/emoji-variants.html); trên một số điện thoại chúng có thể trở thành hình màu. SVG định nghĩa hình học trực tiếp; `currentColor` cho phép nét nhận màu từ phần chữ chứa nó. Tham chiếu kỹ thuật: [SVG 2 / color và currentColor](https://www.w3.org/TR/SVG2/painting.html#ColorProperty).

Không thêm ô vuông bo góc màu xanh/xanh lá phía sau icon. Nút chính có thể có nền ngà, còn icon vẫn dùng màu đen như chữ.

## 9. Chuyển động

Nhịp chung: nhẹ, có điểm bắt đầu và kết thúc rõ. Nội dung kỹ thuật luôn là trọng tâm.

- Hover / phản hồi nút: khoảng 180–220ms, dịch chuyển 2–3px.
- Chuyển panel / reveal: 240–400ms; không làm chữ chờ quá lâu.
- Gloss trên wordmark: một dải sáng trung tính đi qua chậm, chu kỳ khoảng 8 giây.
- Chuyển động vật thể: khoảng 8 giây một chu kỳ nhỏ; dừng khi không còn trên màn hình.
- Video kỹ thuật: để chuyển động thật của cơ cấu tạo nhịp, cắt dựng quanh từng quan sát.
- Tôn trọng chế độ giảm chuyển động; ảnh tĩnh vẫn cần đọc đầy đủ.

Với video social, chỉ chạy một hiệu ứng chính tại một thời điểm. Chữ và sơ đồ cần đứng yên đủ lâu để đọc. Âm thanh, nếu có, nên hỗ trợ nhịp quan sát và thao tác thật.

## 10. Kiểm tra trước khi dùng

1. Tên thương hiệu đúng **blueDStar**, email đúng **datvan.contact4work@gmail.com**.
2. Chữ đọc được khi thu xuống kích thước điện thoại; dấu tiếng Việt đầy đủ.
3. Mọi icon cùng một nét và bảng màu.
4. Ảnh người giữ tỷ lệ; gương mặt và bàn tay không bị che.
5. Có một điểm nhìn chính và đủ khoảng trống.
6. Thuật ngữ, nguồn hình, phạm vi đóng góp và số liệu được đối chiếu.
7. Phần crop / thumbnail giữ được tiêu đề và chủ thể.
8. CTA đi tới liên kết đang hoạt động hoặc câu hỏi có thể trả lời.
