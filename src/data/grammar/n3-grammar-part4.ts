import type { GrammarPoint } from '../../types/grammar'

export const n3GrammarPart4: GrammarPoint[] = [
  {
    id: 'g181',
    title: 'Tổng hợp cách dùng も',
    meaning: 'Cũng / Đến mức / Đến cả / Không chút nào',
    structure: [
      'N + も (cũng)',
      '数量 + も (đến mức)',
      'N + も + Vない (không chút nào)',
    ],
    explanation:
      'Trợ từ も có nhiều cách dùng: nhấn mạnh số lượng lớn, biểu thị "cũng", hoặc kết hợp phủ định để nhấn mạnh "không chút nào".',
    examples: [
      { ja: '私も行きたい。', vi: 'Tôi cũng muốn đi.' },
      { ja: '3時間も待った。', vi: 'Đợi đến tận 3 tiếng.' },
      { ja: '何も食べていない。', vi: 'Chưa ăn gì cả.' },
      { ja: '誰も来なかった。', vi: 'Không ai đến cả.' },
    ],
  },
  {
    id: 'g182',
    title: '～しかない（再掲）',
    meaning: 'Đành phải / Chỉ còn cách',
    structure: [
      'Vる + しかない',
    ],
    explanation:
      'Diễn tả không còn lựa chọn nào khác, đành phải làm. Nhấn mạnh sự bất đắc dĩ.',
    examples: [
      { ja: 'バスがないから歩くしかない。', vi: 'Không có xe buýt nên đành phải đi bộ.' },
      { ja: '自分でやるしかない。', vi: 'Đành phải tự mình làm thôi.' },
      { ja: '我慢するしかない。', vi: 'Chỉ còn cách nhẫn nại thôi.' },
    ],
  },
  {
    id: 'g183',
    title: '～ことはない（再掲）',
    meaning: 'Không cần / Không việc gì phải',
    structure: [
      'Vる + ことはない',
    ],
    explanation:
      'Khuyên ai đó không cần phải lo lắng hoặc không cần phải làm gì.',
    examples: [
      { ja: '心配することはない。', vi: 'Không cần phải lo lắng.' },
      { ja: '急ぐことはないよ。', vi: 'Không việc gì phải vội.' },
      { ja: '泣くことはないよ。', vi: 'Không cần phải khóc đâu.' },
    ],
  },
  {
    id: 'g184',
    title: 'Cách dùng ほど／くらい',
    meaning: 'Khoảng / Đến mức / Chừng',
    structure: [
      'N + ほど／くらい',
      'V + ほど／くらい',
    ],
    explanation:
      'ほど và くらい đều chỉ mức độ xấp xỉ. ほど trang trọng hơn, くらい thường dùng trong văn nói.',
    examples: [
      { ja: '30分ぐらい待った。', vi: 'Đợi khoảng 30 phút.' },
      { ja: '死ぬほど疲れた。', vi: 'Mệt đến mức muốn chết.' },
      { ja: '泣きたいくらい嬉しい。', vi: 'Vui đến mức muốn khóc.' },
    ],
  },
  {
    id: 'g185',
    title: '～に代わって／に代わり（にかわって）',
    meaning: 'Thay cho / Thay mặt',
    structure: [
      'N + に代わって',
      'N + に代わり',
    ],
    explanation:
      'Diễn tả việc thay thế, thay mặt ai đó để làm gì.',
    examples: [
      { ja: '部長に代わって私が挨拶します。', vi: 'Thay mặt trưởng phòng, tôi sẽ phát biểu.' },
      { ja: '母に代わって料理を作った。', vi: 'Thay mẹ nấu ăn.' },
    ],
  },
  {
    id: 'g186',
    title: '～くせに',
    meaning: 'Mặc dù... nhưng (trách)',
    structure: [
      'V／A／N + くせに',
    ],
    explanation:
      'Tương tự のに nhưng mang ý trách móc, phê phán. Luôn có sắc thái tiêu cực.',
    examples: [
      { ja: '知っているくせに教えてくれない。', vi: 'Biết mà không chịu nói cho.' },
      { ja: '自分はできないくせに人の文句を言う。', vi: 'Bản thân không làm được mà lại chê bai người khác.' },
    ],
  },
  {
    id: 'g187',
    title: '～わりに',
    meaning: 'Dù / Tuy... nhưng / Tương đối / So với',
    structure: [
      'V／A／N + わりに(は)',
    ],
    explanation:
      'Diễn tả kết quả trái ngược với kỳ vọng thông thường, nhưng nhẹ nhàng hơn にしては.',
    examples: [
      { ja: '値段のわりにおいしい。', vi: 'So với giá thì ngon.' },
      { ja: '年齢のわりに若く見える。', vi: 'So với tuổi thì trông trẻ.' },
      { ja: '勉強したわりに成績が悪い。', vi: 'Tuy đã học nhưng điểm không tốt.' },
    ],
  },
  {
    id: 'g188',
    title: '～たがる',
    meaning: 'Muốn / Thích (người thứ 3)',
    structure: [
      'Vます + たがる',
      'Aい → がる',
    ],
    explanation:
      'Diễn tả mong muốn, cảm xúc của người thứ ba. Không dùng cho bản thân mình.',
    examples: [
      { ja: '子供はお菓子を食べたがる。', vi: 'Trẻ con muốn ăn bánh kẹo.' },
      { ja: '彼女は日本に行きたがっている。', vi: 'Cô ấy muốn đi Nhật.' },
      { ja: '弟は新しいゲームを欲しがっている。', vi: 'Em trai đang muốn có game mới.' },
    ],
  },
  {
    id: 'g189',
    title: '～きり',
    meaning: 'Chỉ / Chỉ có',
    structure: [
      'Vた + きり',
      'N + きり',
    ],
    explanation:
      'Diễn tả "chỉ có" hoặc "kể từ khi... rồi không". Nhấn mạnh số lượng ít ỏi.',
    examples: [
      { ja: '彼女とは一度会ったきりだ。', vi: 'Chỉ gặp cô ấy duy nhất một lần.' },
      { ja: '二人きりで話したい。', vi: 'Muốn nói chuyện chỉ hai người.' },
      { ja: '出かけたきり帰ってこない。', vi: 'Đi rồi không quay về.' },
    ],
  },
  {
    id: 'g190',
    title: 'Phân biệt まま／っぱなし',
    meaning: 'So sánh "để nguyên" - まま vs っぱなし',
    structure: [
      'Vた + まま → trạng thái giữ nguyên',
      'Vます + っぱなし → bỏ mặc, tiêu cực',
    ],
    explanation:
      'まま: trạng thái giữ nguyên (trung tính). っぱなし: bỏ mặc, không xử lý (tiêu cực, bất cẩn).',
    examples: [
      { ja: '窓を開けたまま寝た。(意図あり)', vi: 'Mở cửa sổ rồi ngủ (có ý).' },
      { ja: '窓を開けっぱなしにした。(不注意)', vi: 'Để cửa sổ mở mặc thế (bất cẩn).' },
    ],
  },
  {
    id: 'g191',
    title: '～たものだ',
    meaning: 'Tôi nhớ / Thường hay (hồi ức)',
    structure: [
      'Vた + ものだ',
    ],
    explanation:
      'Hồi tưởng lại quá khứ với cảm giác nhớ nhung. Thường dùng khi kể về kỷ niệm xưa.',
    examples: [
      { ja: '子供の頃、よくこの川で遊んだものだ。', vi: 'Hồi nhỏ thường hay chơi ở con sông này.' },
      { ja: '昔はよく映画を見に行ったものだ。', vi: 'Ngày xưa thường hay đi xem phim.' },
    ],
  },
  {
    id: 'g192',
    title: '～ことか／ことだろう',
    meaning: 'Thật là / Cực kỳ / Không biết tới cỡ nào',
    structure: [
      'どんなに／なんと + V／A + ことか',
    ],
    explanation:
      'Bày tỏ cảm xúc mạnh, thán phục hoặc cảm thán. Thường đi với どんなに、なんと.',
    examples: [
      { ja: 'どんなに嬉しかったことか。', vi: 'Vui biết bao nhiêu.' },
      { ja: 'なんと素晴らしいことか。', vi: 'Tuyệt vời biết bao.' },
    ],
  },
  {
    id: 'g193',
    title: 'どんなに～ことか',
    meaning: 'Thật là / Cực kỳ / Biết bao / Lắm sao',
    structure: [
      'どんなに + V／A + ことか',
    ],
    explanation:
      'Nhấn mạnh mức độ cảm xúc cao, thường là ngạc nhiên, cảm thán.',
    examples: [
      { ja: 'どんなに心配したことか。', vi: 'Lo lắng biết bao nhiêu.' },
      { ja: 'どんなに辛かったことか。', vi: 'Khổ sở biết bao.' },
    ],
  },
  {
    id: 'g194',
    title: 'どんなに～ても',
    meaning: 'Dẫu cho... cũng / Dù có... cũng',
    structure: [
      'どんなに + Vても／Aくても',
    ],
    explanation:
      'Nhấn mạnh rằng bất chấp mức độ nào, kết quả vẫn không thay đổi.',
    examples: [
      { ja: 'どんなに難しくても、あきらめない。', vi: 'Dù có khó đến đâu cũng không bỏ cuộc.' },
      { ja: 'どんなに頑張っても間に合わない。', vi: 'Dù có cố gắng thế nào cũng không kịp.' },
    ],
  },
  {
    id: 'g195',
    title: '～ても（譲歩）',
    meaning: 'Dù / Dù có / Cho dù... thì cũng',
    structure: [
      'Vても',
      'Aくても',
      'Aでも',
      'Nでも',
    ],
    explanation:
      'Diễn tả sự nhượng bộ, bất chấp điều kiện, kết quả vẫn không thay đổi.',
    examples: [
      { ja: '雨が降っても行きます。', vi: 'Dù trời mưa cũng đi.' },
      { ja: '高くても買います。', vi: 'Dù đắt cũng mua.' },
      { ja: '何回説明しても分からない。', vi: 'Giải thích bao nhiêu lần cũng không hiểu.' },
    ],
  },
  {
    id: 'g196',
    title: '～ように言う',
    meaning: 'Bảo ai đó làm / Yêu cầu / Đề nghị',
    structure: [
      'Vる + ように言う',
      'Vない + ように言う',
    ],
    explanation:
      'Truyền đạt lại yêu cầu, đề nghị hoặc mệnh lệnh gián tiếp.',
    examples: [
      { ja: '先生は学生に宿題をするように言った。', vi: 'Thầy giáo bảo học sinh làm bài tập.' },
      { ja: '医者に無理しないように言われた。', vi: 'Bác sĩ bảo đừng cố quá sức.' },
    ],
  },
  {
    id: 'g197',
    title: '～ように言う／頼む／注意する',
    meaning: 'Bảo / Nhờ / Nhắc nhở (ai đó làm gì)',
    structure: [
      'Vる + ように + 言う／頼む／注意する',
    ],
    explanation:
      'Diễn đạt yêu cầu, nhờ vả, nhắc nhở gián tiếp thông qua ように.',
    examples: [
      { ja: '静かにするように注意した。', vi: 'Nhắc nhở phải im lặng.' },
      { ja: '窓を閉めるように頼んだ。', vi: 'Nhờ đóng cửa sổ.' },
    ],
  },
  {
    id: 'g198',
    title: '～てごらん',
    meaning: 'Hãy thử / Sao không thử',
    structure: [
      'Vて + ごらん',
    ],
    explanation:
      'Khuyến khích ai đó thử làm gì. Nhẹ nhàng hơn ～てみて. Thường dùng với người thân hoặc bạn bè.',
    examples: [
      { ja: 'これ食べてごらん。おいしいよ。', vi: 'Thử ăn cái này đi. Ngon lắm.' },
      { ja: '一度やってごらん。', vi: 'Thử làm một lần xem.' },
    ],
  },
  {
    id: 'g199',
    title: '～から～にかけて',
    meaning: 'Từ... đến / Trong suốt',
    structure: [
      'N + から + N + にかけて',
    ],
    explanation:
      'Chỉ phạm vi thời gian hoặc không gian không chính xác, mang tính ước lượng.',
    examples: [
      { ja: '3月から5月にかけて桜が咲く。', vi: 'Từ tháng 3 đến tháng 5 hoa anh đào nở.' },
      { ja: '関東から東北にかけて雨が降るでしょう。', vi: 'Từ Kanto đến Tohoku có lẽ sẽ mưa.' },
    ],
  },
  {
    id: 'g200',
    title: '～たって／～といっても',
    meaning: 'Cho dù / Mặc dù / Dẫu có nói là... nhưng',
    structure: [
      'Vたって (văn nói)',
      'V／N + といっても',
    ],
    explanation:
      'Nhượng bộ, thường đi kèm phủ nhận kỳ vọng. たって là dạng văn nói của ても.',
    examples: [
      { ja: '走ったって間に合わない。', vi: 'Dù có chạy cũng không kịp.' },
      { ja: '日本語ができるといっても、まだ初級です。', vi: 'Nói là biết tiếng Nhật nhưng vẫn còn sơ cấp.' },
    ],
  },
  {
    id: 'g201',
    title: '～としては',
    meaning: 'Với vị trí / Quan điểm thì / Xét theo / Xét về',
    structure: [
      'N + としては',
    ],
    explanation:
      'Đưa ra nhận xét từ một góc nhìn, vị trí hoặc tư cách cụ thể.',
    examples: [
      { ja: '学生としては、もっと勉強すべきだ。', vi: 'Với tư cách là sinh viên thì nên học nhiều hơn.' },
      { ja: '初めてとしては、よくできた。', vi: 'Xét với lần đầu thì làm khá tốt.' },
    ],
  },
  {
    id: 'g202',
    title: '～という（の）／ということ',
    meaning: 'Cái / Việc / Chuyện mà...',
    structure: [
      'V／A + という + N',
      'V／A + ということ',
    ],
    explanation:
      'Dùng để bổ nghĩa, giải thích nội dung cụ thể cho danh từ hoặc sự việc.',
    examples: [
      { ja: '日本語を勉強するということは大変だ。', vi: 'Việc học tiếng Nhật thật vất vả.' },
      { ja: '彼が帰国するという知らせを受けた。', vi: 'Nhận được tin anh ấy về nước.' },
    ],
  },
  {
    id: 'g203',
    title: 'Danh từ hóa động từ và tính từ',
    meaning: 'Cách biến đổi V/A thành danh từ',
    structure: [
      'Vる + こと／の',
      'Aい → さ (高い → 高さ)',
      'Aい → み (深い → 深み)',
    ],
    explanation:
      'Các cách danh từ hóa: こと／の cho động từ, さ cho tính từ chỉ mức độ, み cho tính từ chỉ cảm giác.',
    examples: [
      { ja: '読むことが好きだ。', vi: 'Tôi thích đọc sách.' },
      { ja: 'この山の高さは3000メートルだ。', vi: 'Chiều cao của ngọn núi này là 3000m.' },
      { ja: 'あたたかみのある部屋。', vi: 'Căn phòng có hơi ấm.' },
    ],
  },
  {
    id: 'g204',
    title: '～によれば／によると',
    meaning: 'Theo / Dựa theo',
    structure: [
      'N + によれば',
      'N + によると',
    ],
    explanation:
      'Dẫn nguồn thông tin, thường đi với ～そうだ／～ということだ.',
    examples: [
      { ja: '天気予報によると、明日は雨だそうだ。', vi: 'Theo dự báo thời tiết, ngày mai sẽ mưa.' },
      { ja: 'ニュースによれば、事故があったそうだ。', vi: 'Theo tin tức, đã xảy ra tai nạn.' },
    ],
  },
  {
    id: 'g205',
    title: '～に関して（にかんして）',
    meaning: 'Liên quan đến / Về',
    structure: [
      'N + に関して',
      'N + に関する + N',
    ],
    explanation:
      'Chỉ chủ đề, đề tài liên quan. Trang trọng hơn について.',
    examples: [
      { ja: 'この問題に関して、ご意見はありますか。', vi: 'Về vấn đề này, bạn có ý kiến gì không?' },
      { ja: '環境に関する研究。', vi: 'Nghiên cứu liên quan đến môi trường.' },
    ],
  },
  {
    id: 'g206',
    title: '～からこそ',
    meaning: 'Chính vì',
    structure: [
      '文 + からこそ',
    ],
    explanation:
      'Nhấn mạnh lý do, nguyên nhân. Mạnh hơn から đơn thuần.',
    examples: [
      { ja: '好きだからこそ、厳しく言う。', vi: 'Chính vì thích nên mới nói nghiêm khắc.' },
      { ja: '努力したからこそ、成功した。', vi: 'Chính vì đã nỗ lực nên mới thành công.' },
    ],
  },
  {
    id: 'g207',
    title: '～さえ',
    meaning: 'Ngay cả / Thậm chí',
    structure: [
      'N + さえ',
    ],
    explanation:
      'Nhấn mạnh trường hợp cực đoan, thậm chí điều hiển nhiên cũng bị ảnh hưởng.',
    examples: [
      { ja: '子供にさえ分かる。', vi: 'Ngay cả trẻ con cũng hiểu.' },
      { ja: '名前さえ覚えていない。', vi: 'Thậm chí tên cũng không nhớ.' },
      { ja: '水さえない。', vi: 'Ngay cả nước cũng không có.' },
    ],
  },
  {
    id: 'g208',
    title: '～こそ',
    meaning: 'Chính là / Mới chính là',
    structure: [
      'N + こそ',
    ],
    explanation:
      'Nhấn mạnh danh từ phía trước, thể hiện rằng đó mới là điều quan trọng nhất.',
    examples: [
      { ja: 'これこそ本物だ。', vi: 'Đây mới chính là hàng thật.' },
      { ja: '今年こそ合格したい。', vi: 'Năm nay nhất định phải đỗ.' },
      { ja: 'こちらこそよろしくお願いします。', vi: 'Tôi mới là người xin được chiếu cố.' },
    ],
  },
  {
    id: 'g209',
    title: '～ようとしない',
    meaning: 'Không chịu / Không có ý định',
    structure: [
      'Vよう + としない',
    ],
    explanation:
      'Diễn tả việc ai đó cố tình không muốn làm, từ chối nỗ lực.',
    examples: [
      { ja: '彼は謝ろうとしない。', vi: 'Anh ta không chịu xin lỗi.' },
      { ja: '子供は薬を飲もうとしない。', vi: 'Trẻ không chịu uống thuốc.' },
    ],
  },
  {
    id: 'g210',
    title: '～だけ／しか～ない',
    meaning: 'Chỉ / Chỉ có',
    structure: [
      'N + だけ (chỉ)',
      'N + しか + Vない (chỉ có, nhấn mạnh ít)',
    ],
    explanation:
      'だけ chỉ giới hạn trung tính. しか～ない nhấn mạnh số lượng ít, thiếu.',
    examples: [
      { ja: 'お金は1000円だけある。', vi: 'Chỉ có 1000 yên (trung tính).' },
      { ja: 'お金は1000円しかない。', vi: 'Chỉ có mỗi 1000 yên (ít quá).' },
    ],
  },
  {
    id: 'g211',
    title: '～ようと思います／ようと思っています',
    meaning: 'Tôi định / Tôi đang có ý định',
    structure: [
      'Vよう + と思う／と思っている',
    ],
    explanation:
      'と思う: quyết định vừa mới đưa ra. と思っている: ý định đã có từ trước.',
    examples: [
      { ja: '来年日本に行こうと思います。', vi: 'Tôi định sang năm đi Nhật.' },
      { ja: '毎日運動しようと思っています。', vi: 'Tôi đang có ý định tập thể dục mỗi ngày.' },
    ],
  },
  {
    id: 'g212',
    title: '～ないと／なくちゃ',
    meaning: 'Phải (làm gì)',
    structure: [
      'Vないと (いけない)',
      'Vなくちゃ (いけない)',
    ],
    explanation:
      'Dạng rút gọn trong văn nói của ～なければならない. Thể hiện nghĩa vụ.',
    examples: [
      { ja: '早く行かないと。', vi: 'Phải đi nhanh thôi.' },
      { ja: '勉強しなくちゃ。', vi: 'Phải học thôi.' },
      { ja: '明日までにレポートを出さないと。', vi: 'Phải nộp báo cáo trước ngày mai.' },
    ],
  },
  {
    id: 'g213',
    title: '～ちゃう／じゃう',
    meaning: 'Mất rồi / Xong cho rồi',
    structure: [
      'Vて + しまう → Vちゃう',
      'Vで + しまう → Vじゃう',
    ],
    explanation:
      'Dạng rút gọn của ～てしまう trong văn nói. Diễn tả hoàn thành hoặc hối tiếc.',
    examples: [
      { ja: '全部食べちゃった。', vi: 'Ăn hết mất rồi.' },
      { ja: '忘れちゃった。', vi: 'Quên mất rồi.' },
      { ja: '壊れちゃった。', vi: 'Hỏng mất rồi.' },
    ],
  },
  {
    id: 'g214',
    title: 'Các cách sử dụng いい',
    meaning: 'Tốt / Được / Không cần / Nên',
    structure: [
      'Vて + いい (được phép)',
      'Vなくて + いい (không cần)',
      'Vば + いい (nên)',
    ],
    explanation:
      'いい có nhiều cách dùng: cho phép, không cần thiết, đưa ra gợi ý.',
    examples: [
      { ja: 'ここに座ってもいいですか。', vi: 'Ngồi đây có được không?' },
      { ja: '来なくてもいいよ。', vi: 'Không cần đến cũng được.' },
      { ja: '先生に聞けばいい。', vi: 'Hỏi thầy giáo là được.' },
    ],
  },
  {
    id: 'g215',
    title: '～ということ',
    meaning: 'Việc / Chuyện (rằng)',
    structure: [
      'V／A + ということ',
    ],
    explanation:
      'Danh từ hóa mệnh đề, diễn tả nội dung hoặc ý nghĩa của sự việc.',
    examples: [
      { ja: '日本語を勉強するということは楽しい。', vi: 'Việc học tiếng Nhật thật vui.' },
      { ja: '彼が来ないということを聞いた。', vi: 'Tôi nghe nói rằng anh ấy không đến.' },
    ],
  },
  {
    id: 'g216',
    title: '～なければ～ない',
    meaning: 'Nếu không... thì không',
    structure: [
      'Vなければ + Vない',
    ],
    explanation:
      'Diễn tả điều kiện cần thiết, nếu không đáp ứng thì kết quả sẽ không có.',
    examples: [
      { ja: '勉強しなければ合格できない。', vi: 'Nếu không học thì không thể đỗ.' },
      { ja: '行かなければ分からない。', vi: 'Nếu không đi thì không biết được.' },
    ],
  },
  {
    id: 'g217',
    title: '～以前（いぜん）',
    meaning: 'Trước đây / Trước kia / Trước khi',
    structure: [
      'V + 以前',
      'N + 以前',
    ],
    explanation:
      'Chỉ thời điểm hoặc giai đoạn trước một mốc thời gian nào đó.',
    examples: [
      { ja: '日本に来る以前、中国語を勉強していた。', vi: 'Trước khi đến Nhật, tôi đã học tiếng Trung.' },
      { ja: '以前はここに住んでいた。', vi: 'Trước đây tôi sống ở đây.' },
    ],
  },
  {
    id: 'g218',
    title: '～ておく',
    meaning: 'Làm trước / Để (nguyên như thế)',
    structure: [
      'Vて + おく',
    ],
    explanation:
      'Diễn tả hành động chuẩn bị trước hoặc để nguyên một trạng thái.',
    examples: [
      { ja: '旅行の前にホテルを予約しておく。', vi: 'Đặt khách sạn trước khi du lịch.' },
      { ja: '窓を開けておいてください。', vi: 'Hãy để cửa sổ mở nhé.' },
      { ja: '明日のために準備しておく。', vi: 'Chuẩn bị sẵn cho ngày mai.' },
    ],
  },
  {
    id: 'g219',
    title: '～ように',
    meaning: 'Để / Hãy / Đừng / Cầu cho',
    structure: [
      'Vる + ように (để)',
      'Vない + ように (để không)',
    ],
    explanation:
      'Diễn tả mục đích (để), lời nguyện (cầu cho), hoặc yêu cầu gián tiếp.',
    examples: [
      { ja: '聞こえるように大きい声で話す。', vi: 'Nói to để nghe được.' },
      { ja: '遅刻しないように早く起きた。', vi: 'Dậy sớm để không bị trễ.' },
      { ja: '試験に合格できますように。', vi: 'Cầu cho đỗ kỳ thi.' },
    ],
  },
  {
    id: 'g220',
    title: '～以下（いか）',
    meaning: 'Trở xuống / Dưới / Không bằng / Như sau',
    structure: [
      'N + 以下',
    ],
    explanation:
      'Chỉ mức dưới hoặc bằng một ngưỡng nào đó. Cũng dùng để giới thiệu nội dung phía dưới.',
    examples: [
      { ja: '18歳以下は入場禁止。', vi: 'Dưới 18 tuổi cấm vào.' },
      { ja: '以下の通りです。', vi: 'Như dưới đây.' },
    ],
  },
]
