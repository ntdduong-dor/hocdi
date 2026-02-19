import type { GrammarPoint } from '../../types/grammar'

export const n3GrammarPart3: GrammarPoint[] = [
  {
    id: 'g141',
    title: '～んだって',
    meaning: 'Nghe nói là',
    structure: [
      'V／A thể thường + んだって',
      'N + なんだって',
    ],
    explanation:
      'Truyền đạt thông tin nghe được từ người khác, dạng văn nói thân mật. Tương tự ～そうだ (truyền văn).',
    examples: [
      { ja: '明日は休みなんだって。', vi: 'Nghe nói ngày mai được nghỉ.' },
      { ja: '彼女、結婚するんだって。', vi: 'Nghe nói cô ấy sắp kết hôn.' },
      { ja: 'あの映画、面白いんだって。', vi: 'Nghe nói phim đó hay lắm.' },
    ],
  },
  {
    id: 'g142',
    title: 'なぜなら～からだ',
    meaning: 'Lý do là vì / Bởi vì',
    structure: [
      'なぜなら(ば) + 文 + からだ',
    ],
    explanation:
      'Dùng để giải thích lý do một cách trang trọng. Thường dùng trong văn viết.',
    examples: [
      { ja: '日本語を勉強している。なぜなら日本で働きたいからだ。', vi: 'Tôi đang học tiếng Nhật. Lý do là vì tôi muốn làm việc ở Nhật.' },
      { ja: '彼は信頼できる。なぜなら嘘をつかないからだ。', vi: 'Anh ấy đáng tin cậy. Bởi vì anh ấy không nói dối.' },
    ],
  },
  {
    id: 'g143',
    title: '～ならば',
    meaning: 'Nếu',
    structure: [
      'V／A／N + ならば',
    ],
    explanation:
      'Dạng trang trọng của なら, dùng để đặt điều kiện giả thiết.',
    examples: [
      { ja: '行くならば、早く行きなさい。', vi: 'Nếu đi thì hãy đi nhanh.' },
      { ja: '安いならば買いたい。', vi: 'Nếu rẻ thì muốn mua.' },
      { ja: '日本語を勉強するならば、毎日練習すべきだ。', vi: 'Nếu học tiếng Nhật thì nên luyện tập mỗi ngày.' },
    ],
  },
  {
    id: 'g144',
    title: '～はもちろん',
    meaning: 'Thì đương nhiên rồi / Không chỉ... mà còn',
    structure: [
      'N + はもちろん + N + も',
    ],
    explanation:
      'Nhấn mạnh rằng điều đầu tiên là hiển nhiên, ngoài ra còn có thêm điều khác nữa.',
    examples: [
      { ja: '日本語はもちろん、英語も話せます。', vi: 'Tiếng Nhật thì đương nhiên, tiếng Anh cũng nói được.' },
      { ja: '平日はもちろん、休日も仕事がある。', vi: 'Ngày thường đương nhiên rồi, ngày nghỉ cũng phải làm việc.' },
    ],
  },
  {
    id: 'g145',
    title: '～に比べて（にくらべて）',
    meaning: 'So với',
    structure: [
      'N + に比べて',
    ],
    explanation:
      'Dùng để so sánh hai sự vật hoặc sự việc với nhau.',
    examples: [
      { ja: '去年に比べて今年は暖かい。', vi: 'So với năm ngoái thì năm nay ấm hơn.' },
      { ja: '兄に比べて弟は背が高い。', vi: 'So với anh trai thì em trai cao hơn.' },
      { ja: '日本語に比べて英語は簡単だ。', vi: 'So với tiếng Nhật thì tiếng Anh dễ hơn.' },
    ],
  },
  {
    id: 'g146',
    title: '～上げる／上がる（あげる／あがる）',
    meaning: 'Vừa xong / Vừa hoàn thành',
    structure: [
      'Vます + 上げる (他動詞)',
      'Vます + 上がる (自動詞)',
    ],
    explanation:
      'Gắn sau động từ để diễn tả hành động hoàn thành. 上げる dùng với tha động từ, 上がる dùng với tự động từ.',
    examples: [
      { ja: 'レポートを書き上げた。', vi: 'Tôi đã viết xong báo cáo.' },
      { ja: 'ケーキが焼き上がった。', vi: 'Bánh đã nướng xong.' },
      { ja: 'やっと仕上がった。', vi: 'Cuối cùng cũng hoàn thành.' },
    ],
  },
  {
    id: 'g147',
    title: '～ばいいと思う',
    meaning: 'Hy vọng / Mong muốn / Thì tốt biết mấy',
    structure: [
      'Vば + いいと思う',
      'Vたら + いいと思う',
    ],
    explanation:
      'Bày tỏ hy vọng, mong muốn điều gì đó xảy ra. Cũng dùng để đưa ra gợi ý.',
    examples: [
      { ja: '明日晴れればいいと思う。', vi: 'Hy vọng ngày mai trời nắng.' },
      { ja: '試験に合格すればいいと思う。', vi: 'Mong là sẽ đỗ kỳ thi.' },
      { ja: '早く元気になればいいですね。', vi: 'Hy vọng sẽ sớm khỏe lại nhé.' },
    ],
  },
  {
    id: 'g148',
    title: '～ばよかった',
    meaning: 'Phải chi / Giá mà / Lẽ ra nên',
    structure: [
      'Vば + よかった',
    ],
    explanation:
      'Diễn tả sự hối tiếc về quá khứ, lẽ ra nên làm hoặc không nên làm gì.',
    examples: [
      { ja: 'もっと勉強すればよかった。', vi: 'Phải chi học nhiều hơn.' },
      { ja: '早く起きればよかった。', vi: 'Giá mà dậy sớm hơn.' },
      { ja: 'あんなこと言わなければよかった。', vi: 'Lẽ ra không nên nói những điều đó.' },
    ],
  },
  {
    id: 'g149',
    title: '～まで',
    meaning: 'Cho đến khi / Đến tận / Đến mức / Thậm chí',
    structure: [
      'N + まで',
      'V + まで',
    ],
    explanation:
      'Ngoài nghĩa cơ bản "cho đến", còn dùng để nhấn mạnh mức độ cực đoan hoặc bất ngờ.',
    examples: [
      { ja: '夜12時まで勉強した。', vi: 'Tôi đã học đến 12 giờ đêm.' },
      { ja: '死ぬまで頑張る。', vi: 'Cố gắng đến chết.' },
      { ja: '子供にまで笑われた。', vi: 'Thậm chí bị trẻ con cười.' },
    ],
  },
  {
    id: 'g150',
    title: '～かなんか',
    meaning: 'Hay cái gì đó / Hay gì đó',
    structure: [
      'N + かなんか',
    ],
    explanation:
      'Dùng khi không chắc chắn hoặc không muốn nói rõ ràng, mang tính văn nói thân mật.',
    examples: [
      { ja: 'コーヒーかなんか飲む？', vi: 'Uống cà phê hay gì đó không?' },
      { ja: '風邪かなんかだと思う。', vi: 'Tôi nghĩ là bị cảm hay gì đó.' },
    ],
  },
  {
    id: 'g151',
    title: 'もしかしたら～かもしれない',
    meaning: 'Có lẽ / Biết đâu / Có thể',
    structure: [
      'もしかしたら + V／A／N + かもしれない',
    ],
    explanation:
      'Diễn tả khả năng, suy đoán không chắc chắn. もしかしたら tăng cường mức độ không chắc chắn.',
    examples: [
      { ja: 'もしかしたら明日雨かもしれない。', vi: 'Biết đâu ngày mai mưa.' },
      { ja: 'もしかしたら彼は来ないかもしれない。', vi: 'Có lẽ anh ấy không đến.' },
      { ja: 'もしかしたら道を間違えたかもしれない。', vi: 'Có thể tôi đã đi nhầm đường.' },
    ],
  },
  {
    id: 'g152',
    title: 'だけど／だけれど',
    meaning: 'Nhưng / Tuy nhiên',
    structure: [
      '文1 + だけど + 文2',
    ],
    explanation:
      'Liên từ nối hai mệnh đề trái ngược. だけど là dạng văn nói, だけれども trang trọng hơn.',
    examples: [
      { ja: '高いだけど、おいしい。', vi: 'Đắt nhưng ngon.' },
      { ja: '行きたいだけど、時間がない。', vi: 'Muốn đi nhưng không có thời gian.' },
    ],
  },
  {
    id: 'g153',
    title: 'ところが',
    meaning: 'Nhưng / Tuy nhiên (bất ngờ)',
    structure: [
      '文1。ところが + 文2',
    ],
    explanation:
      'Liên từ diễn tả kết quả trái ngược với kỳ vọng, mang tính bất ngờ hơn でも／しかし.',
    examples: [
      { ja: '雨が降ると思った。ところが、晴れた。', vi: 'Tôi tưởng trời mưa. Nhưng trời lại nắng.' },
      { ja: '難しいと思った。ところが、意外に簡単だった。', vi: 'Tôi tưởng khó. Nhưng lại dễ bất ngờ.' },
    ],
  },
  {
    id: 'g154',
    title: 'ですから／だから',
    meaning: 'Cho nên / Vì vậy',
    structure: [
      '文1。ですから／だから + 文2',
    ],
    explanation:
      'Liên từ chỉ nguyên nhân - kết quả. ですから trang trọng hơn だから.',
    examples: [
      { ja: '雨が降った。だから、試合は中止になった。', vi: 'Trời mưa. Cho nên trận đấu bị hủy.' },
      { ja: '日本語は難しい。ですから毎日勉強しています。', vi: 'Tiếng Nhật khó. Vì vậy tôi học mỗi ngày.' },
    ],
  },
  {
    id: 'g155',
    title: 'ところで',
    meaning: 'Thế còn / Nhân tiện / Tiện thể',
    structure: [
      '文1。ところで + 文2',
    ],
    explanation:
      'Liên từ dùng để chuyển sang chủ đề khác trong cuộc hội thoại.',
    examples: [
      { ja: '今日はいい天気ですね。ところで、明日の予定は？', vi: 'Hôm nay trời đẹp nhỉ. Nhân tiện, kế hoạch ngày mai thế nào?' },
      { ja: '仕事はうまくいっています。ところで、引っ越しの件はどうなりましたか。', vi: 'Công việc suôn sẻ. Nhân tiện, chuyện chuyển nhà thế nào rồi?' },
    ],
  },
  {
    id: 'g156',
    title: 'もし～たなら／たら',
    meaning: 'Nếu như / Giả dụ như',
    structure: [
      'もし + Vたら／Vたなら',
    ],
    explanation:
      'Đặt điều kiện giả thiết, thường dùng cho tình huống chưa xảy ra. もし tăng cường tính giả thiết.',
    examples: [
      { ja: 'もし時間があったら、遊びに行こう。', vi: 'Nếu có thời gian thì đi chơi nhé.' },
      { ja: 'もし彼に会ったら、よろしくと伝えてください。', vi: 'Nếu gặp anh ấy, hãy gửi lời hỏi thăm giúp tôi.' },
    ],
  },
  {
    id: 'g157',
    title: '～たところ',
    meaning: 'Khi làm xong thì / Kết quả là',
    structure: [
      'Vた + ところ',
    ],
    explanation:
      'Diễn tả khi thực hiện xong hành động thì phát hiện ra kết quả (thường bất ngờ).',
    examples: [
      { ja: '調べたところ、問題が見つかった。', vi: 'Khi kiểm tra thì phát hiện ra vấn đề.' },
      { ja: '電話したところ、留守だった。', vi: 'Khi gọi điện thì không có ai ở nhà.' },
      { ja: '先生に聞いたところ、テストは来週だそうだ。', vi: 'Hỏi thầy thì nghe nói kỳ thi tuần sau.' },
    ],
  },
  {
    id: 'g158',
    title: '～ところだった',
    meaning: 'Suýt nữa thì',
    structure: [
      'Vる + ところだった',
    ],
    explanation:
      'Diễn tả một tình huống suýt xảy ra nhưng may mắn không xảy ra (thường tiêu cực).',
    examples: [
      { ja: '遅刻するところだった。', vi: 'Suýt nữa thì bị trễ.' },
      { ja: '転ぶところだった。', vi: 'Suýt nữa thì ngã.' },
      { ja: 'バスに乗り遅れるところだった。', vi: 'Suýt nữa thì bị lỡ xe buýt.' },
    ],
  },
  {
    id: 'g159',
    title: '～わけではない',
    meaning: 'Không hẳn là / Không có nghĩa là',
    structure: [
      'V／A／N + わけではない',
    ],
    explanation:
      'Phủ nhận một phần, không phải hoàn toàn phủ định mà chỉ nói rằng không hẳn như vậy.',
    examples: [
      { ja: '嫌いなわけではない。ただ忙しいだけだ。', vi: 'Không hẳn là ghét. Chỉ là bận thôi.' },
      { ja: '日本語ができないわけではないが、まだ上手じゃない。', vi: 'Không phải là không biết tiếng Nhật, nhưng vẫn chưa giỏi.' },
      { ja: 'お金がないわけではないが、節約したい。', vi: 'Không phải không có tiền, nhưng muốn tiết kiệm.' },
    ],
  },
  {
    id: 'g160',
    title: '決して～ない',
    meaning: 'Nhất quyết không / Nhất định không / Tuyệt đối không',
    structure: [
      '決して + Vない',
      '決して + Aくない',
    ],
    explanation:
      'Nhấn mạnh phủ định tuyệt đối. Luôn đi với dạng phủ định.',
    examples: [
      { ja: '決して忘れない。', vi: 'Tuyệt đối không quên.' },
      { ja: '決してあきらめない。', vi: 'Nhất quyết không bỏ cuộc.' },
      { ja: '決して簡単ではない。', vi: 'Tuyệt đối không dễ dàng.' },
    ],
  },
  {
    id: 'g161',
    title: 'めったに～ない',
    meaning: 'Hầu như không / Hiếm khi',
    structure: [
      'めったに + Vない',
    ],
    explanation:
      'Diễn tả tần suất rất thấp, hiếm khi xảy ra. Luôn đi với dạng phủ định.',
    examples: [
      { ja: 'めったに遅刻しない。', vi: 'Hầu như không bị trễ.' },
      { ja: 'こんなチャンスはめったにない。', vi: 'Cơ hội như thế này hiếm lắm.' },
      { ja: 'めったに外食しない。', vi: 'Hiếm khi ăn ngoài.' },
    ],
  },
  {
    id: 'g162',
    title: '少しも～ない／ちっとも～ない',
    meaning: 'Một chút cũng không / Hoàn toàn không',
    structure: [
      '少しも + Vない',
      'ちっとも + Vない',
    ],
    explanation:
      'Nhấn mạnh phủ định hoàn toàn, không có một chút nào. ちっとも là dạng văn nói.',
    examples: [
      { ja: '少しも分からない。', vi: 'Một chút cũng không hiểu.' },
      { ja: 'ちっとも変わっていない。', vi: 'Không thay đổi chút nào.' },
      { ja: '少しも面白くない。', vi: 'Một chút cũng không thú vị.' },
    ],
  },
  {
    id: 'g163',
    title: 'それと／あと',
    meaning: 'Và / Thêm nữa / Sau đó / Thì',
    structure: [
      '文1。それと + 文2',
      '文1。あと + 文2',
    ],
    explanation:
      'Liên từ bổ sung thông tin. それと và あと dùng trong văn nói để thêm thông tin.',
    examples: [
      { ja: 'ビールをお願いします。それと、枝豆も。', vi: 'Cho tôi bia. Và thêm đậu nành nữa.' },
      { ja: 'パンを買ってきて。あと、牛乳も。', vi: 'Mua bánh mì nhé. Thêm cả sữa nữa.' },
    ],
  },
  {
    id: 'g164',
    title: '～その上（そのうえ）',
    meaning: 'Thêm vào đó / Hơn nữa',
    structure: [
      '文1。その上 + 文2',
    ],
    explanation:
      'Bổ sung thêm thông tin cùng chiều (cùng tích cực hoặc cùng tiêu cực).',
    examples: [
      { ja: '彼は頭がいい。その上、スポーツも得意だ。', vi: 'Anh ấy thông minh. Hơn nữa còn giỏi thể thao.' },
      { ja: '風邪をひいた。その上、財布もなくした。', vi: 'Bị cảm. Hơn nữa còn mất ví.' },
    ],
  },
  {
    id: 'g165',
    title: 'それとも',
    meaning: 'Hoặc / Hoặc là / Hay là',
    structure: [
      '文1。それとも + 文2',
    ],
    explanation:
      'Đưa ra lựa chọn giữa hai hoặc nhiều khả năng trong câu hỏi.',
    examples: [
      { ja: 'コーヒーにしますか。それとも紅茶にしますか。', vi: 'Bạn chọn cà phê? Hay là trà?' },
      { ja: '電車で行く？それともバスで行く？', vi: 'Đi tàu? Hay là đi xe buýt?' },
    ],
  },
  {
    id: 'g166',
    title: '全く～ない（まったく～ない）',
    meaning: 'Hoàn toàn không',
    structure: [
      '全く + Vない',
      '全く + Aくない',
    ],
    explanation:
      'Nhấn mạnh phủ định tuyệt đối. Tương tự 少しも～ない nhưng mạnh hơn.',
    examples: [
      { ja: '全く分からない。', vi: 'Hoàn toàn không hiểu.' },
      { ja: '全く知らなかった。', vi: 'Hoàn toàn không biết.' },
      { ja: '全く興味がない。', vi: 'Hoàn toàn không có hứng thú.' },
    ],
  },
  {
    id: 'g167',
    title: 'なんか～ない／なんか～いない',
    meaning: 'Không / Không có đâu',
    structure: [
      'N + なんか + Vない',
    ],
    explanation:
      'Dùng なんか với phủ định để nhấn mạnh phủ nhận, thường mang tính cảm xúc mạnh.',
    examples: [
      { ja: 'あの人のことなんか好きじゃない。', vi: 'Tôi không thích người đó đâu.' },
      { ja: 'お金なんかいらない。', vi: 'Không cần tiền đâu.' },
    ],
  },
  {
    id: 'g168',
    title: '～終わる（おわる）',
    meaning: 'Kết thúc / Xong',
    structure: [
      'Vます + 終わる',
    ],
    explanation:
      'Gắn sau động từ để diễn tả hành động đã hoàn thành, kết thúc.',
    examples: [
      { ja: '本を読み終わった。', vi: 'Đã đọc xong sách.' },
      { ja: 'やっと書き終わった。', vi: 'Cuối cùng cũng viết xong.' },
      { ja: '食べ終わったら、片付けてね。', vi: 'Ăn xong thì dọn dẹp nhé.' },
    ],
  },
  {
    id: 'g169',
    title: '～始める（はじめる）',
    meaning: 'Bắt đầu (làm gì đó)',
    structure: [
      'Vます + 始める',
    ],
    explanation:
      'Gắn sau động từ để diễn tả hành động bắt đầu. Khác với ～出す ở chỗ 始める nhấn mạnh sự bắt đầu có chủ đích.',
    examples: [
      { ja: '雨が降り始めた。', vi: 'Trời bắt đầu mưa.' },
      { ja: '日本語を勉強し始めた。', vi: 'Tôi bắt đầu học tiếng Nhật.' },
      { ja: '赤ちゃんが歩き始めた。', vi: 'Em bé bắt đầu biết đi.' },
    ],
  },
  {
    id: 'g170',
    title: '～続ける（つづける）',
    meaning: 'Tiếp tục / Duy trì liên tục',
    structure: [
      'Vます + 続ける',
    ],
    explanation:
      'Gắn sau động từ để diễn tả hành động được tiếp tục, duy trì không ngừng.',
    examples: [
      { ja: '3時間走り続けた。', vi: 'Đã chạy liên tục 3 tiếng.' },
      { ja: '夢をあきらめないで追い続ける。', vi: 'Không từ bỏ ước mơ mà tiếp tục theo đuổi.' },
      { ja: '雨は降り続けている。', vi: 'Mưa vẫn tiếp tục rơi.' },
    ],
  },
  {
    id: 'g171',
    title: '～などものか',
    meaning: 'Không thể nào / Làm sao mà được',
    structure: [
      'V + ものか',
      'V + もんか (văn nói)',
    ],
    explanation:
      'Nhấn mạnh ý phủ định mạnh mẽ, thể hiện quyết tâm không làm hoặc phủ nhận hoàn toàn.',
    examples: [
      { ja: 'あんな人に負けるものか。', vi: 'Làm sao mà thua người như thế được.' },
      { ja: '二度と行くもんか。', vi: 'Không bao giờ đi lại nữa.' },
    ],
  },
  {
    id: 'g172',
    title: '～けれど／けれども',
    meaning: 'Tuy / Mặc dù / Nhưng',
    structure: [
      '文1 + けれど(も) + 文2',
    ],
    explanation:
      'Liên từ nối hai mệnh đề trái ngược, tương tự が nhưng văn nói hơn.',
    examples: [
      { ja: '高いけれど、品質がいい。', vi: 'Đắt nhưng chất lượng tốt.' },
      { ja: '日本に行きたいけれど、お金がない。', vi: 'Muốn đi Nhật nhưng không có tiền.' },
    ],
  },
  {
    id: 'g173',
    title: 'もし～としても',
    meaning: 'Ngay cả nếu / Thậm chí nếu / Dù cho',
    structure: [
      'もし + V／A + としても',
    ],
    explanation:
      'Đặt giả thiết cực đoan và nhấn mạnh kết quả vẫn không thay đổi.',
    examples: [
      { ja: 'もし宝くじに当たったとしても、仕事は続ける。', vi: 'Ngay cả nếu trúng xổ số, tôi vẫn tiếp tục làm việc.' },
      { ja: 'もし失敗したとしても、後悔はしない。', vi: 'Dù cho thất bại thì cũng không hối hận.' },
    ],
  },
  {
    id: 'g174',
    title: 'まるで～ようだ／みたいだ',
    meaning: 'Cứ như thể là / Giống hệt như',
    structure: [
      'まるで + N + のようだ',
      'まるで + V + みたいだ',
    ],
    explanation:
      'So sánh ví von mạnh, nhấn mạnh sự giống nhau đáng kinh ngạc.',
    examples: [
      { ja: 'まるで夢のようだ。', vi: 'Cứ như thể là mơ vậy.' },
      { ja: 'まるで子供みたいだ。', vi: 'Giống hệt như trẻ con.' },
      { ja: 'まるで天使のように美しい。', vi: 'Đẹp như thiên thần.' },
    ],
  },
  {
    id: 'g175',
    title: '～において／における',
    meaning: 'Tại / Trong / Ở',
    structure: [
      'N + において',
      'N + における + N',
    ],
    explanation:
      'Chỉ nơi chốn, lĩnh vực, thời điểm diễn ra sự việc. Trang trọng, dùng trong văn viết.',
    examples: [
      { ja: '日本において、桜は最も人気がある。', vi: 'Tại Nhật Bản, hoa anh đào được yêu thích nhất.' },
      { ja: 'この分野における研究は進んでいる。', vi: 'Nghiên cứu trong lĩnh vực này đang tiến triển.' },
    ],
  },
  {
    id: 'g176',
    title: '～かな',
    meaning: 'Liệu có... không / ...không nhỉ',
    structure: [
      'V／A／N + かな',
    ],
    explanation:
      'Tự hỏi, suy nghĩ trong lòng. Dùng trong văn nói, thể hiện sự không chắc chắn.',
    examples: [
      { ja: '明日天気がいいかな。', vi: 'Ngày mai trời có đẹp không nhỉ.' },
      { ja: 'この色でいいかな。', vi: 'Màu này có được không nhỉ.' },
      { ja: '彼は来るかな。', vi: 'Liệu anh ấy có đến không.' },
    ],
  },
  {
    id: 'g177',
    title: '～たて',
    meaning: 'Vừa mới (xong) / Còn mới / Còn tươi',
    structure: [
      'Vます + たて',
    ],
    explanation:
      'Diễn tả trạng thái vừa mới hoàn thành xong, còn mới. Thường dùng với tính chất tích cực.',
    examples: [
      { ja: '焼きたてのパン。', vi: 'Bánh mì mới nướng xong.' },
      { ja: '入れたてのコーヒー。', vi: 'Cà phê mới pha.' },
      { ja: '生まれたての赤ちゃん。', vi: 'Em bé mới sinh.' },
    ],
  },
  {
    id: 'g178',
    title: 'その結果（そのけっか）',
    meaning: 'Kết quả là / Kết cục là',
    structure: [
      '文1。その結果 + 文2',
    ],
    explanation:
      'Liên từ chỉ kết quả của hành động hoặc sự kiện trước đó.',
    examples: [
      { ja: '毎日勉強した。その結果、試験に合格した。', vi: 'Học mỗi ngày. Kết quả là đã đỗ kỳ thi.' },
      { ja: 'ダイエットを続けた。その結果、5キロ痩せた。', vi: 'Tiếp tục ăn kiêng. Kết quả là giảm được 5kg.' },
    ],
  },
  {
    id: 'g179',
    title: 'つまり',
    meaning: 'Hay nói cách khác / Tức là',
    structure: [
      '文1。つまり + 文2',
    ],
    explanation:
      'Dùng để tóm tắt, giải thích lại ý trước đó bằng cách diễn đạt khác.',
    examples: [
      { ja: '彼は私の母の息子です。つまり、私の兄です。', vi: 'Anh ấy là con trai của mẹ tôi. Tức là anh trai tôi.' },
      { ja: 'つまり、賛成ということですね。', vi: 'Tức là đồng ý đúng không?' },
    ],
  },
  {
    id: 'g180',
    title: '～もの／もん',
    meaning: 'Bởi vì / Do (biện hộ, giải thích)',
    structure: [
      '文 + もの／もん',
    ],
    explanation:
      'Dùng cuối câu để đưa ra lý do biện hộ, thường mang tính nhõng nhẽo hoặc phàn nàn. もん là dạng văn nói.',
    examples: [
      { ja: 'だって寒いんだもん。', vi: 'Tại vì lạnh mà.' },
      { ja: '食べたくないもの。', vi: 'Tại không muốn ăn mà.' },
      { ja: '仕方ないもん。', vi: 'Biết làm sao được mà.' },
    ],
  },
]
