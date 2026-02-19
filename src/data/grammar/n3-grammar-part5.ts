import type { GrammarPoint } from '../../types/grammar'

export const n3GrammarPart5: GrammarPoint[] = [
  {
    id: 'g221',
    title: 'Thể bị động trong tiếng Nhật',
    meaning: 'Bị / Được (thể bị động)',
    structure: [
      'Nhóm 1: Vう → Vあれる',
      'Nhóm 2: Vる → Vられる',
      'する → される',
      'くる → こられる',
    ],
    explanation:
      'Thể bị động dùng khi chủ ngữ chịu tác động của hành động. Có bị động trực tiếp và bị động gián tiếp (bị phiền).',
    examples: [
      { ja: '先生に褒められた。', vi: 'Được thầy giáo khen.' },
      { ja: '雨に降られた。', vi: 'Bị mưa (dính mưa).' },
      { ja: '足を踏まれた。', vi: 'Bị dẫm chân.' },
    ],
  },
  {
    id: 'g222',
    title: '～つもりだ・だった（が・のに）',
    meaning: 'Đã định làm mà lại / Cứ ngỡ là',
    structure: [
      'Vた + つもりだったが',
      'Vた + つもりだったのに',
    ],
    explanation:
      'Diễn tả kết quả trái ngược với ý định ban đầu hoặc nhận thức sai lầm.',
    examples: [
      { ja: 'メールを送ったつもりだったが、送れていなかった。', vi: 'Cứ tưởng đã gửi mail rồi nhưng hóa ra chưa gửi.' },
      { ja: '冗談のつもりだったのに、怒られた。', vi: 'Định nói đùa nhưng bị mắng.' },
    ],
  },
  {
    id: 'g223',
    title: '～ていく／てくる',
    meaning: 'Đi dần / Đến dần / Tiếp tục thay đổi',
    structure: [
      'Vて + いく (hướng ra xa, tương lai)',
      'Vて + くる (hướng lại, quá khứ)',
    ],
    explanation:
      'ていく: thay đổi hướng xa dần hoặc tương lai. てくる: thay đổi đến hiện tại hoặc bắt đầu.',
    examples: [
      { ja: 'これから寒くなっていく。', vi: 'Từ giờ sẽ lạnh dần.' },
      { ja: '最近暑くなってきた。', vi: 'Gần đây trời nóng dần lên.' },
      { ja: '日本語が分かるようになってきた。', vi: 'Đã dần hiểu tiếng Nhật rồi.' },
    ],
  },
  {
    id: 'g224',
    title: '～てはじめて',
    meaning: 'Kể từ khi / Bắt đầu (lần đầu)',
    structure: [
      'Vて + はじめて',
    ],
    explanation:
      'Diễn tả nhờ thực hiện hành động A mà lần đầu tiên nhận ra hoặc trải nghiệm B.',
    examples: [
      { ja: '病気になってはじめて健康のありがたさが分かった。', vi: 'Bị bệnh mới lần đầu hiểu được sự quý giá của sức khỏe.' },
      { ja: '日本に来てはじめて桜を見た。', vi: 'Đến Nhật mới lần đầu thấy hoa anh đào.' },
    ],
  },
  {
    id: 'g225',
    title: '～だろうと思う',
    meaning: 'Tôi nghĩ có lẽ / Tôi cho rằng chắc',
    structure: [
      'V／A／N + だろうと思う',
    ],
    explanation:
      'Suy đoán kết hợp với ý kiến cá nhân, thể hiện mức độ không chắc chắn.',
    examples: [
      { ja: '明日は晴れるだろうと思う。', vi: 'Tôi nghĩ ngày mai chắc sẽ nắng.' },
      { ja: '彼は来ないだろうと思った。', vi: 'Tôi đã nghĩ chắc anh ấy không đến.' },
    ],
  },
  {
    id: 'g226',
    title: '～のではない',
    meaning: 'Không hẳn là / Không phải là đâu',
    structure: [
      'V／A + のではない',
      'N + なのではない',
    ],
    explanation:
      'Phủ nhận nhẹ nhàng, gợi ý rằng sự thật có thể khác. Thường kết hợp với だろうか.',
    examples: [
      { ja: '彼は嘘をついているのではないか。', vi: 'Phải chăng anh ta đang nói dối?' },
      { ja: 'それは間違いなのではないですか。', vi: 'Đó không phải là sai sao?' },
    ],
  },
  {
    id: 'g227',
    title: '～んじゃない／のではないだろうか',
    meaning: 'Chẳng phải là... sao / Phải chăng',
    structure: [
      'V／A + んじゃない？(văn nói)',
      'V／A + のではないだろうか (văn viết)',
    ],
    explanation:
      'Đưa ra suy đoán dưới dạng câu hỏi tu từ, nhẹ nhàng gợi ý.',
    examples: [
      { ja: 'もう帰ったんじゃない？', vi: 'Chẳng phải đã về rồi sao?' },
      { ja: 'これは問題があるのではないだろうか。', vi: 'Phải chăng cái này có vấn đề?' },
    ],
  },
  {
    id: 'g228',
    title: '～くらい／ぐらい',
    meaning: 'Khoảng / Có chừng',
    structure: [
      '数量 + くらい／ぐらい',
      'N + くらい／ぐらい',
    ],
    explanation:
      'Chỉ số lượng xấp xỉ. くらい và ぐらい có thể thay thế cho nhau.',
    examples: [
      { ja: '30分くらいかかる。', vi: 'Mất khoảng 30 phút.' },
      { ja: '500円ぐらい。', vi: 'Khoảng 500 yên.' },
    ],
  },
  {
    id: 'g229',
    title: '～つもりで',
    meaning: 'Xem như đã / Xem như là / Với ý định',
    structure: [
      'Vた + つもりで',
      'N + の + つもりで',
    ],
    explanation:
      'Hành động với tâm thế như đã hoàn thành hoặc như thể đang ở tư cách nào đó.',
    examples: [
      { ja: '旅行に行ったつもりで貯金する。', vi: 'Tiết kiệm xem như đã đi du lịch rồi.' },
      { ja: '先生のつもりで教える。', vi: 'Dạy với tâm thế như là giáo viên.' },
    ],
  },
  {
    id: 'g230',
    title: '～としても',
    meaning: 'Cho dù / Cho dẫu / Dầu cho',
    structure: [
      'V／A + としても',
    ],
    explanation:
      'Giả thiết nhượng bộ, dù điều kiện có đúng thì kết quả vẫn không thay đổi.',
    examples: [
      { ja: '安いとしても買わない。', vi: 'Cho dù rẻ cũng không mua.' },
      { ja: '失敗したとしても後悔しない。', vi: 'Cho dù thất bại cũng không hối hận.' },
    ],
  },
  {
    id: 'g231',
    title: '～にしても',
    meaning: 'Cho dù / Ngay cả... thì cũng',
    structure: [
      'V／N + にしても',
    ],
    explanation:
      'Tương tự としても nhưng nhẹ nhàng hơn, dùng nhiều trong văn nói.',
    examples: [
      { ja: '反対するにしても、理由を言ってほしい。', vi: 'Cho dù phản đối thì cũng muốn nghe lý do.' },
      { ja: '買うにしても、もう少し考えたい。', vi: 'Dù có mua thì cũng muốn suy nghĩ thêm.' },
    ],
  },
  {
    id: 'g232',
    title: '～にわたって／にわたり',
    meaning: 'Suốt / Khắp / Trải suốt / Trải dài',
    structure: [
      'N + にわたって／にわたり',
      'N + にわたる + N',
    ],
    explanation:
      'Chỉ phạm vi rộng về thời gian hoặc không gian.',
    examples: [
      { ja: '3日間にわたって会議が行われた。', vi: 'Cuộc họp diễn ra suốt 3 ngày.' },
      { ja: '全国にわたって被害が出た。', vi: 'Thiệt hại trải rộng khắp cả nước.' },
    ],
  },
  {
    id: 'g233',
    title: '～に違いない（にちがいない）',
    meaning: 'Chắc chắn / Chắn hẳn / Nhất định là',
    structure: [
      'V／A／N + に違いない',
    ],
    explanation:
      'Suy đoán với độ tin cậy cao, gần như chắc chắn.',
    examples: [
      { ja: '彼は日本人に違いない。', vi: 'Chắc chắn anh ấy là người Nhật.' },
      { ja: 'このケーキはおいしいに違いない。', vi: 'Bánh này nhất định ngon.' },
    ],
  },
  {
    id: 'g234',
    title: '～ぎみ',
    meaning: 'Có vẻ hơi / Có cảm giác',
    structure: [
      'N + ぎみ',
      'Vます + ぎみ',
    ],
    explanation:
      'Diễn tả xu hướng nhẹ, có vẻ hơi. Thường dùng cho tình trạng sức khỏe hoặc thời tiết.',
    examples: [
      { ja: '風邪ぎみだ。', vi: 'Có vẻ hơi bị cảm.' },
      { ja: '太りぎみだ。', vi: 'Có vẻ hơi béo lên.' },
      { ja: '遅れぎみだ。', vi: 'Có vẻ hơi trễ.' },
    ],
  },
  {
    id: 'g235',
    title: '～に反して／に反する（にはんして）',
    meaning: 'Trái với / Ngược lại với',
    structure: [
      'N + に反して',
      'N + に反する + N',
    ],
    explanation:
      'Diễn tả kết quả ngược lại với kỳ vọng, quy định hoặc ý kiến.',
    examples: [
      { ja: '予想に反して、試験は簡単だった。', vi: 'Trái với dự đoán, kỳ thi dễ.' },
      { ja: '親の期待に反して、彼は芸術家になった。', vi: 'Trái với kỳ vọng của bố mẹ, anh ấy trở thành nghệ sĩ.' },
    ],
  },
  {
    id: 'g236',
    title: '～からには',
    meaning: 'Một khi đã... thì sẽ / Bởi vì... nên',
    structure: [
      'V + からには',
    ],
    explanation:
      'Nhấn mạnh quyết tâm hoặc nghĩa vụ khi đã bắt đầu hoặc chấp nhận điều gì.',
    examples: [
      { ja: 'やるからには、最後までやる。', vi: 'Đã làm thì làm đến cùng.' },
      { ja: '約束したからには守る。', vi: 'Đã hứa thì phải giữ.' },
    ],
  },
  {
    id: 'g237',
    title: '～ほど（比較）',
    meaning: 'Hơn (so sánh)',
    structure: [
      'N + ほど + Aくない',
    ],
    explanation:
      'Dùng trong so sánh phủ định: A không bằng B. Tương tự "ほど...ない".',
    examples: [
      { ja: '東京ほど大阪は大きくない。', vi: 'Osaka không to bằng Tokyo.' },
      { ja: '去年ほど今年は暑くない。', vi: 'Năm nay không nóng bằng năm ngoái.' },
    ],
  },
  {
    id: 'g238',
    title: '～際に（さいに）',
    meaning: 'Khi / Lúc / Trong trường hợp / Nhân dịp',
    structure: [
      'V + 際(に)',
      'N + の + 際(に)',
    ],
    explanation:
      'Chỉ thời điểm, dịp nào đó. Trang trọng hơn ～とき.',
    examples: [
      { ja: 'お帰りの際に、お気をつけください。', vi: 'Khi về xin hãy cẩn thận.' },
      { ja: '申し込みの際に、身分証明書が必要です。', vi: 'Khi đăng ký cần có giấy tờ tùy thân.' },
    ],
  },
  {
    id: 'g239',
    title: '～といえば／～といったら',
    meaning: 'Nói đến... thì / Nhắc mới nhớ',
    structure: [
      'N + といえば',
      'N + といったら',
    ],
    explanation:
      'Liên tưởng: khi nhắc đến A thì nghĩ ngay đến B. Cũng dùng để chuyển chủ đề.',
    examples: [
      { ja: '日本といえば、寿司ですね。', vi: 'Nói đến Nhật Bản thì phải là sushi nhỉ.' },
      { ja: '夏といえば花火大会だ。', vi: 'Nhắc đến mùa hè là nghĩ đến lễ hội pháo hoa.' },
    ],
  },
  {
    id: 'g240',
    title: '～に加えて（にくわえて）',
    meaning: 'Không chỉ... mà còn / Thêm vào đó',
    structure: [
      'N + に加えて',
    ],
    explanation:
      'Bổ sung thêm thông tin, tương tự ～だけでなく nhưng trang trọng hơn.',
    examples: [
      { ja: '英語に加えて、中国語も話せます。', vi: 'Ngoài tiếng Anh, còn nói được tiếng Trung.' },
      { ja: '雨に加えて、風も強くなった。', vi: 'Ngoài mưa, gió cũng mạnh lên.' },
    ],
  },
  {
    id: 'g241',
    title: '～は～くらいだ／くらいのものだ',
    meaning: 'Chỉ / Chỉ có... thôi',
    structure: [
      '～は～くらいだ',
      '～は～くらいのものだ',
    ],
    explanation:
      'Nhấn mạnh rằng chỉ có duy nhất một trường hợp hoặc mức độ.',
    examples: [
      { ja: 'こんなことができるのは彼くらいだ。', vi: 'Chỉ có anh ấy mới làm được điều này.' },
      { ja: '知っているのは私くらいのものだ。', vi: 'Chỉ có mình tôi biết thôi.' },
    ],
  },
  {
    id: 'g242',
    title: '～中心（ちゅうしん）',
    meaning: 'Đứng đầu / Xung quanh / Chủ yếu / Trọng tâm là',
    structure: [
      'N + を中心に',
      'N + 中心の + N',
    ],
    explanation:
      'Chỉ trung tâm, trọng tâm của sự vật hoặc hoạt động.',
    examples: [
      { ja: '東京を中心に地震が起きた。', vi: 'Động đất xảy ra lấy Tokyo làm trung tâm.' },
      { ja: '文法中心の授業。', vi: 'Bài học lấy ngữ pháp làm trọng tâm.' },
    ],
  },
  {
    id: 'g243',
    title: '～をはじめ／はじめとして',
    meaning: 'Tiêu biểu như là / Trước tiên là / Trước hết là',
    structure: [
      'N + をはじめ(として)',
    ],
    explanation:
      'Đưa ra ví dụ tiêu biểu nhất trong danh sách, tương tự ～を中心に.',
    examples: [
      { ja: '社長をはじめ、全社員が参加した。', vi: 'Bắt đầu từ giám đốc, toàn bộ nhân viên đều tham gia.' },
      { ja: '東京をはじめとして、大都市は物価が高い。', vi: 'Tiêu biểu như Tokyo, các thành phố lớn giá cả đều đắt.' },
    ],
  },
  {
    id: 'g244',
    title: '～につれて',
    meaning: 'Càng... càng / Cùng với',
    structure: [
      'V + につれて',
      'N + につれて',
    ],
    explanation:
      'Diễn tả hai sự thay đổi song song, khi A thay đổi thì B cũng thay đổi theo.',
    examples: [
      { ja: '年を取るにつれて、体力が落ちる。', vi: 'Càng lớn tuổi, thể lực càng giảm.' },
      { ja: '時間が経つにつれて、忘れていく。', vi: 'Thời gian trôi, dần dần quên đi.' },
    ],
  },
  {
    id: 'g245',
    title: '～に向けて（にむけて）',
    meaning: 'Hướng đến / Nhằm đến',
    structure: [
      'N + に向けて',
    ],
    explanation:
      'Chỉ mục tiêu, đích đến của hành động hoặc kế hoạch.',
    examples: [
      { ja: '試験に向けて勉強している。', vi: 'Đang học hướng đến kỳ thi.' },
      { ja: '未来に向けて頑張ろう。', vi: 'Hãy cố gắng hướng đến tương lai.' },
    ],
  },
  {
    id: 'g246',
    title: '～向け（むけ）',
    meaning: 'Dành cho / Hướng đến',
    structure: [
      'N + 向け(の)',
    ],
    explanation:
      'Chỉ đối tượng mục tiêu của sản phẩm, dịch vụ.',
    examples: [
      { ja: '子供向けの本。', vi: 'Sách dành cho trẻ em.' },
      { ja: '初心者向けのコース。', vi: 'Khóa học dành cho người mới bắt đầu.' },
    ],
  },
  {
    id: 'g247',
    title: 'Phân biệt を通じて và を通して',
    meaning: 'Thông qua / Trong suốt',
    structure: [
      'N + を通じて (trừu tượng hơn)',
      'N + を通して (cụ thể hơn)',
    ],
    explanation:
      'Cả hai đều có nghĩa "thông qua" hoặc "trong suốt". を通じて trừu tượng hơn, を通して cụ thể hơn.',
    examples: [
      { ja: 'インターネットを通じて情報を集める。', vi: 'Thu thập thông tin thông qua internet.' },
      { ja: '一年を通して暖かい。', vi: 'Ấm suốt quanh năm.' },
    ],
  },
  {
    id: 'g248',
    title: 'Phân biệt に違いない và はずです',
    meaning: 'So sánh "chắc chắn" và "chắc hẳn"',
    structure: [
      'に違いない → chắc chắn (chủ quan)',
      'はずだ → chắc hẳn (có căn cứ)',
    ],
    explanation:
      'に違いない: tin chắc từ suy đoán cá nhân. はずだ: suy luận có logic, có căn cứ.',
    examples: [
      { ja: '彼は犯人に違いない。(直感)', vi: 'Chắc chắn anh ta là thủ phạm (trực giác).' },
      { ja: 'もう届いているはずだ。(根拠)', vi: 'Chắc hẳn đã đến rồi (có căn cứ).' },
    ],
  },
  {
    id: 'g249',
    title: '～に伴って（にともなって）',
    meaning: 'Cùng với / Đồng thời với',
    structure: [
      'N + に伴って',
      'V + のに伴って',
    ],
    explanation:
      'Diễn tả hai sự việc xảy ra đồng thời hoặc song hành, thường dùng trong văn viết.',
    examples: [
      { ja: '経済の発展に伴って、環境問題も増えた。', vi: 'Cùng với sự phát triển kinh tế, vấn đề môi trường cũng tăng.' },
    ],
  },
  {
    id: 'g250',
    title: 'Phân biệt につれて／にしたがって／とともに',
    meaning: 'So sánh các cách nói "càng... càng"',
    structure: [
      'につれて → tự nhiên, song song',
      'にしたがって → theo, tuân theo',
      'とともに → cùng lúc',
    ],
    explanation:
      'Ba mẫu này đều chỉ thay đổi song song nhưng sắc thái khác nhau.',
    examples: [
      { ja: '年を取るにつれて (自然に)', vi: 'Càng lớn tuổi (tự nhiên).' },
      { ja: '指示にしたがって (従う)', vi: 'Theo chỉ dẫn (tuân theo).' },
      { ja: '時代とともに (一緒に)', vi: 'Cùng với thời đại.' },
    ],
  },
  {
    id: 'g251',
    title: '～に決まっている（にきまっている）',
    meaning: 'Chắc chắn / Nhất định',
    structure: [
      'V／A／N + に決まっている',
    ],
    explanation:
      'Suy đoán chắc chắn với độ tin cậy rất cao, mang tính chủ quan mạnh.',
    examples: [
      { ja: 'そんなことは嘘に決まっている。', vi: 'Chuyện đó chắc chắn là nói dối.' },
      { ja: '彼が来るに決まっている。', vi: 'Nhất định anh ấy sẽ đến.' },
    ],
  },
  {
    id: 'g252',
    title: '～を通じて／通して',
    meaning: 'Thông qua / Trong suốt',
    structure: [
      'N + を通じて',
      'N + を通して',
    ],
    explanation:
      'Chỉ phương tiện, kênh thông tin (thông qua) hoặc khoảng thời gian (trong suốt).',
    examples: [
      { ja: '友達を通じて彼女と知り合った。', vi: 'Quen cô ấy thông qua bạn bè.' },
      { ja: '一年を通じてこの地域は暑い。', vi: 'Trong suốt năm vùng này đều nóng.' },
    ],
  },
  {
    id: 'g253',
    title: '～向き（むき）',
    meaning: 'Phù hợp với / Dành cho / Hướng',
    structure: [
      'N + 向き(の)',
    ],
    explanation:
      'Chỉ sự phù hợp tự nhiên (khác với 向け chỉ đối tượng mục tiêu).',
    examples: [
      { ja: '家族向きのレストラン。', vi: 'Nhà hàng phù hợp cho gia đình.' },
      { ja: '南向きの部屋。', vi: 'Phòng hướng nam.' },
    ],
  },
  {
    id: 'g254',
    title: '～にしたがって／にしたがい',
    meaning: 'Theo / Càng... càng / Đi cùng với... thì',
    structure: [
      'V + にしたがって',
      'N + にしたがって',
    ],
    explanation:
      'Hai nghĩa: (1) Tuân theo, theo; (2) Thay đổi song song.',
    examples: [
      { ja: '先生の指示にしたがって行動する。', vi: 'Hành động theo chỉ dẫn của thầy giáo.' },
      { ja: '人口が増えるにしたがって、問題も増える。', vi: 'Dân số tăng lên thì vấn đề cũng tăng theo.' },
    ],
  },
  {
    id: 'g255',
    title: '～とともに',
    meaning: 'Cùng với / Đồng thời',
    structure: [
      'N + とともに',
      'V + とともに',
    ],
    explanation:
      'Diễn tả hai sự việc xảy ra đồng thời hoặc "cùng với ai/cái gì".',
    examples: [
      { ja: '時代とともに変わる。', vi: 'Thay đổi cùng với thời đại.' },
      { ja: '家族とともに暮らす。', vi: 'Sống cùng với gia đình.' },
    ],
  },
  {
    id: 'g256',
    title: '～だけ（hết mức）',
    meaning: 'Hết mức có thể / Cho thỏa thích',
    structure: [
      'Vる + だけ + V',
    ],
    explanation:
      'Nhấn mạnh làm hết khả năng, không giới hạn.',
    examples: [
      { ja: '食べたいだけ食べなさい。', vi: 'Ăn bao nhiêu tùy thích.' },
      { ja: 'できるだけ早く来てください。', vi: 'Hãy đến sớm nhất có thể.' },
    ],
  },
  {
    id: 'g257',
    title: '～だけでなく／だけじゃなくて',
    meaning: 'Không chỉ... mà còn / Không nhưng... mà còn',
    structure: [
      'N + だけでなく',
      'V + だけでなく',
    ],
    explanation:
      'Bổ sung thông tin ngoài điều đã biết. Tương tự ばかりでなく.',
    examples: [
      { ja: '英語だけでなく、中国語もできる。', vi: 'Không chỉ tiếng Anh mà còn biết tiếng Trung.' },
      { ja: '彼は歌が上手なだけでなく、踊りも得意だ。', vi: 'Anh ấy không chỉ hát hay mà còn giỏi nhảy.' },
    ],
  },
  {
    id: 'g258',
    title: '～ようがない／ようもない',
    meaning: 'Không có cách nào mà / Không thể nào',
    structure: [
      'Vます + ようがない',
    ],
    explanation:
      'Diễn tả việc hoàn toàn không có cách nào để thực hiện, bất lực.',
    examples: [
      { ja: '住所が分からないので、手紙の送りようがない。', vi: 'Không biết địa chỉ nên không có cách nào gửi thư.' },
      { ja: '言いようがない気持ちだ。', vi: 'Cảm giác không thể diễn tả bằng lời.' },
    ],
  },
  {
    id: 'g259',
    title: '～てこのかた',
    meaning: 'Kể từ khi... thì / Kể từ sau khi... thì',
    structure: [
      'Vて + このかた',
      'N + このかた',
    ],
    explanation:
      'Chỉ khoảng thời gian từ một mốc đến hiện tại, nhấn mạnh sự liên tục.',
    examples: [
      { ja: '生まれてこのかた、海外に行ったことがない。', vi: 'Từ khi sinh ra đến giờ chưa bao giờ ra nước ngoài.' },
    ],
  },
  {
    id: 'g260',
    title: '～て以来（ていらい）',
    meaning: 'Kể từ sau khi',
    structure: [
      'Vて + 以来',
    ],
    explanation:
      'Chỉ mốc thời gian bắt đầu, kể từ đó đến nay. Trang trọng hơn ～てから.',
    examples: [
      { ja: '日本に来て以来、一度も帰国していない。', vi: 'Kể từ khi đến Nhật, chưa một lần về nước.' },
      { ja: '卒業して以来、彼に会っていない。', vi: 'Kể từ khi tốt nghiệp, chưa gặp anh ấy.' },
    ],
  },
]
