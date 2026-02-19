import type { GrammarPoint } from '../../types/grammar'

export const n3GrammarPart2: GrammarPoint[] = [
  {
    id: 'g081',
    title: '～さえ～ば',
    meaning: 'Chỉ cần... thì / Miễn là... thì',
    structure: [
      'Vます + さえすれば／さえしなければ',
      'Vて + さえいれば',
      'Aい → く + さえあれば',
      'Aな + で + さえあれば',
      'N + (で) + さえあれば',
    ],
    explanation:
      'Biểu thị điều kiện tối thiểu cần đáp ứng để kết quả xảy ra. Nhấn mạnh rằng chỉ cần một điều kiện duy nhất là đủ, những yếu tố khác không cần thiết.',
    examples: [
      { ja: '薬を飲みさえすれば治ります。', vi: 'Anh chỉ cần uống thuốc là sẽ khỏi.' },
      { ja: '天気さえよければ、よい旅行になるでしょう。', vi: 'Chỉ cần trời đẹp thì chắc chúng ta sẽ có chuyến du lịch thú vị.' },
      { ja: '時間さえあれば、あんな問題全部できたよ。', vi: 'Chỉ cần có thời gian thì tôi đã có thể làm hết các câu hỏi.' },
      { ja: 'インスタントラーメンはお湯を入れさえすれば食べられる。', vi: 'Mì ăn liền chỉ cần đổ nước sôi vào là có thể ăn được.' },
    ],
  },
  {
    id: 'g082',
    title: '～かける／かけの／かけだ',
    meaning: 'Đang dở dang / Đang làm giữa chừng',
    structure: [
      'Vます + かける',
      'Vます + かけの + N',
      'Vます + かけだ',
    ],
    explanation:
      'Diễn tả hành động đang dở dang, chưa hoàn thành. Có thể mô tả hành động cố ý hoặc không cố ý bị bỏ dở. Dạng かけの dùng bổ nghĩa cho danh từ.',
    examples: [
      { ja: 'この本はまだ読みかけだ。', vi: 'Quyển sách này tôi vẫn đang đọc giữa chừng.' },
      { ja: 'お風呂に入りかけたときに、電話が鳴った。', vi: 'Khi tôi chuẩn bị tắm thì điện thoại reo.' },
      { ja: '彼のことが好きだと言いかけてやめた。', vi: 'Tôi đang định nói yêu anh ấy thì dừng lại.' },
      { ja: '食べかけのケーキが置いてある。', vi: 'Có một cái bánh đang ăn dở đặt trên bàn.' },
      { ja: '読みかけの雑誌。', vi: 'Một tờ tạp chí đang đọc dở.' },
      { ja: '風邪は治りかけたが、またひどくなってしまった。', vi: 'Cảm vừa sắp hết thì bị nặng trở lại.' },
    ],
  },
  {
    id: 'g083',
    title: '～切る（きる）',
    meaning: 'Hết / Hoàn toàn / Hoàn tất / Cắt đứt',
    structure: [
      'Vます + 切る',
    ],
    explanation:
      'Gắn vào sau động từ để diễn tả việc hoàn thành một hành động triệt để, làm xong hoàn toàn, hoặc cắt đứt. Cũng có thể chỉ trạng thái đạt đến cực điểm.',
    examples: [
      { ja: '長い小説、２日間で読み切った。', vi: 'Tôi đã đọc xong cuốn tiểu thuyết dài trong 2 ngày.' },
      { ja: 'お金を使い切ってしまった。', vi: 'Tôi đã tiêu hết tiền rồi.' },
      { ja: '彼のことを信じ切っています。', vi: 'Tôi có niềm tin tuyệt đối vào anh ấy.' },
      { ja: '疲れ切ってしまった。', vi: 'Tôi mệt nhoài.' },
    ],
  },
  {
    id: 'g084',
    title: '～切れる／切れない',
    meaning: 'Có thể hoàn thành / Không thể hoàn thành',
    structure: [
      'Vます + 切れる／切れない',
    ],
    explanation:
      'Diễn tả khả năng hoàn thành hoặc không thể hoàn thành một hành động. 切れない phổ biến hơn, nhấn mạnh sự bất lực do số lượng, cường độ vượt quá khả năng.',
    examples: [
      { ja: 'ご飯の量が多くて、食べ切れないよ。', vi: 'Cơm nhiều quá tôi không thể ăn hết được.' },
      { ja: '数え切れないほどたくさんの星が光っている。', vi: 'Nhiều ngôi sao đến mức không thể đếm được đang chiếu sáng.' },
      { ja: '彼女に僕の気持ちを伝え切れなかった。', vi: 'Tôi không thể bày tỏ hết nỗi lòng của mình với cô ấy.' },
      { ja: '夏休みが待ち切れない。', vi: 'Tôi rất mong đợi đến kì nghỉ hè.' },
      { ja: '子どもはあきらめ切れないらしい。', vi: 'Đứa bé có vẻ không muốn từ bỏ.' },
    ],
  },
  {
    id: 'g085',
    title: '～通す（とおす）',
    meaning: 'Làm đến cùng / Làm suốt / Làm một mạch',
    structure: [
      'Vます + 通す',
    ],
    explanation:
      'Gắn vào sau động từ chủ ý để diễn tả việc kiên trì thực hiện hành động đến cùng, không bỏ cuộc giữa chừng.',
    examples: [
      { ja: 'やると決めたことは最後までやり通すつもりだ。', vi: 'Chuyện gì đã quyết định làm thì làm cho đến cùng.' },
      { ja: '途中で転んでしまったが、あきらめないでゴールまで走り通した。', vi: 'Mặc dù ngã giữa chừng nhưng chạy đến đích, không chịu bỏ cuộc.' },
      { ja: '彼は忍耐強く、最後までやり通す力がある。', vi: 'Anh ấy kiên nhẫn, nỗ lực làm đến cùng.' },
      { ja: '昨日の晩、この小説を読み通したので、今ちょっと疲れます。', vi: 'Tối hôm qua đã đọc hết quyển tiểu thuyết này nên sáng nay có chút mệt.' },
    ],
  },
  {
    id: 'g086',
    title: '～出す（だす）',
    meaning: 'Bắt đầu (đột nhiên) / Bất thình lình',
    structure: [
      'Vます + 出す',
    ],
    explanation:
      'Diễn tả hành động bắt đầu một cách đột ngột, bất ngờ. Khác với ～始める (nhấn mạnh bắt đầu liên tục), ～出す nhấn mạnh sự đột ngột.',
    examples: [
      { ja: '急に空が暗くなって、雨が降り出しました。', vi: 'Bất chợt trời tối đi và mưa bắt đầu rơi.' },
      { ja: '赤ちゃんが急に泣き出しました。', vi: 'Em bé đột nhiên khóc òa lên.' },
      { ja: '彼が急に笑い出しました。', vi: 'Đột nhiên anh ta cười ầm lên.' },
      { ja: '犯人は警察に気づきどこかに向かって走り出した。', vi: 'Tên tội phạm nhận thấy cảnh sát và bắt đầu chạy đi đâu đó.' },
      { ja: '女の子は私の顔を見ると、突然泣き出した。', vi: 'Bé gái đột nhiên òa lên khóc khi nhìn thấy mặt tôi.' },
    ],
  },
  {
    id: 'g087',
    title: '～づらい',
    meaning: 'Khó (làm gì)',
    structure: [
      'Vます + づらい',
    ],
    explanation:
      'Diễn tả sự khó khăn khi thực hiện hành động nào đó, thường mang tính tâm lý hoặc cảm xúc hơn là vật lý.',
    examples: [
      { ja: '個人的なことなので職場の人には頼みづらい。', vi: 'Vì là việc cá nhân nên khó nhờ đồng nghiệp.' },
      { ja: 'ここは黒板の字が見づらい位置です。', vi: 'Đây là vị trí khó nhìn thấy chữ trên bảng.' },
      { ja: '虫歯が痛くて食べづらい。', vi: 'Răng sâu đau nên khó ăn.' },
      { ja: '彼に怒らせてしまったから、会いに行きづらいなあ。', vi: 'Vì lỡ làm anh ấy giận rồi, nên đi gặp anh ấy cảm thấy rất khó.' },
      { ja: 'この質問には答えづらいです。', vi: 'Câu hỏi này rất khó trả lời.' },
      { ja: '彼女は付き合いづらい人だ。', vi: 'Cô ấy là một người khó hòa đồng.' },
      { ja: 'この漢字は覚えづらいです。', vi: 'Chữ kanji này rất khó nhớ.' },
    ],
  },
  {
    id: 'g088',
    title: '～がち',
    meaning: 'Thường hay / Dễ / Có xu hướng',
    structure: [
      'N + がちだ／がちの／がちな',
      'Vます + がちだ／がちの／がちな',
    ],
    explanation:
      'Diễn tả xu hướng dễ xảy ra hoặc thường xuyên xảy ra, thường mang ý nghĩa tiêu cực, không tốt.',
    examples: [
      { ja: '雪が降ると、電車は遅れがちだ。', vi: 'Khi tuyết rơi thì xe điện thường hay trễ chuyến.' },
      { ja: '冬は風邪をひきがちだ。', vi: 'Mùa đông thì dễ bị cảm.' },
      { ja: '結婚記念日さえ忘れがちになる。', vi: 'Người ta thường hay quên cả kỷ niệm ngày cưới.' },
      { ja: '環境問題は無関心になりがちである。', vi: 'Vấn đề môi trường dễ khiến người ta vô cảm.' },
    ],
  },
  {
    id: 'g089',
    title: '～らしい（接尾辞）',
    meaning: 'Đúng kiểu / Đặc trưng của / Xứng đáng',
    structure: [
      'N + らしい',
    ],
    explanation:
      'Dùng như hậu tố gắn với danh từ, mô tả đặc điểm đặc trưng hoặc bản chất thật sự của sự vật, thường mang ý nghĩa tích cực.',
    examples: [
      { ja: '今日は、春らしい暖かい日ですね。', vi: 'Hôm nay ấm áp như một ngày mùa xuân vậy.' },
      { ja: '私は女性らしい洋服はあまり着ない。', vi: 'Tôi hầu như không mặc quần áo nữ tính.' },
      { ja: '彼は男らしいね。', vi: 'Anh ta nam tính thật.' },
      { ja: 'あの子は子供らしい。', vi: 'Đứa trẻ đó thật là trẻ con.' },
      { ja: '自分らしく生きなさい。', vi: 'Hãy sống đúng với bản chất của mình.' },
    ],
  },
  {
    id: 'g090',
    title: '～っぽい',
    meaning: 'Như / Có cảm giác / Hay / Có xu hướng / Nhiều',
    structure: [
      'Vます + っぽい',
      'N + っぽい',
      'Aい + っぽい',
    ],
    explanation:
      'Diễn tả 3 nghĩa chính: (1) Giống như, có cảm giác giống; (2) Hay, có xu hướng (thường tiêu cực); (3) Nhiều, đầy. Thường dùng trong văn nói.',
    examples: [
      { ja: 'あの小学生、大人っぽい。', vi: 'Em học sinh kia rất ra dáng người lớn.' },
      { ja: '彼は子どもっぽいです。', vi: 'Cậu ta cứ như con nít vậy.' },
      { ja: '彼女は男っぽい。', vi: 'Cô ấy cứ như con trai vậy.' },
      { ja: '彼は忘れっぽい人だ。', vi: 'Anh ta là người hay quên.' },
      { ja: 'この茶は水っぽい。', vi: 'Trà này nhạt như nước.' },
      { ja: 'この料理は油っぽくていやだ。', vi: 'Món ăn này nhiều dầu mỡ quá.' },
      { ja: 'ほこりっぽい部屋。', vi: 'Phòng đầy bụi.' },
    ],
  },
  {
    id: 'g091',
    title: '～みたい',
    meaning: 'Giống như / Hình như là / Có vẻ như',
    structure: [
      'N／A／V + みたいだ／みたいに',
      'N／A／V + みたいな + N',
    ],
    explanation:
      'Có 3 cách dùng: (1) So sánh ví dụ điển hình; (2) So sánh giống nhau; (3) Suy đoán. みたいな đi trước danh từ, みたいに đi trước động từ hoặc tính từ.',
    examples: [
      { ja: '彼みたいな強い人が好きです。', vi: 'Tôi thích những người mạnh mẽ như anh ấy.' },
      { ja: 'リンさんみたいに日本語がうまくなりたい。', vi: 'Tôi muốn giỏi tiếng Nhật như bạn Linh.' },
      { ja: '冬なのに、暖かくて、まるで春みたいです。', vi: 'Mặc dù là mùa đông nhưng lại ấm như mùa xuân.' },
      { ja: '彼の話し方は、女みたいだ。', vi: 'Cách nói chuyện của anh ta như phụ nữ.' },
      { ja: '明日は雨みたいね。', vi: 'Có vẻ là mai trời mưa.' },
    ],
  },
  {
    id: 'g092',
    title: 'Phân biệt らしい／っぽい／みたい／よう',
    meaning: 'So sánh các cách diễn tả "giống như"',
    structure: [
      'N + らしい → đúng bản chất',
      'N + っぽい → có vẻ giống, có xu hướng',
      'N + みたい → trông giống',
      'N + のよう → giống như (trang trọng)',
    ],
    explanation:
      'らしい: đúng bản chất, tích cực. っぽい: có cảm giác giống, mang tính đánh giá. みたい: so sánh bề ngoài, văn nói. よう: trang trọng hơn みたい.',
    examples: [
      { ja: '子供らしい → 天真的, đúng kiểu trẻ con', vi: '(Khen) Đúng kiểu trẻ con hồn nhiên.' },
      { ja: '子供っぽい → 幼稚な感じ', vi: '(Chê) Như trẻ con, ấu trĩ.' },
      { ja: '子供みたい → 子供に似ている', vi: 'Giống trẻ con (trung tính).' },
    ],
  },
  {
    id: 'g093',
    title: '～だらけ',
    meaning: 'Toàn là / Đầy / Chỉ toàn là',
    structure: [
      'N + だらけ',
    ],
    explanation:
      'Diễn tả trạng thái đầy ắp, toàn bộ là thứ gì đó, thường mang ý nghĩa tiêu cực, không mong muốn từ góc nhìn người nói.',
    examples: [
      { ja: '間違いだらけの手紙。', vi: 'Lá thư đầy lỗi.' },
      { ja: '部屋はおもちゃだらけ。', vi: 'Căn phòng đầy ắp đồ chơi.' },
      { ja: '部屋はゴミだらけ。', vi: 'Căn phòng toàn là rác.' },
      { ja: '傷だらけになって帰ってきた。', vi: 'Trở về nhà với người đầy vết thương.' },
      { ja: '借金だらけ。', vi: 'Nợ nần chồng chất.' },
      { ja: '泥だらけの靴。', vi: 'Đôi giầy đầy bùn đất.' },
      { ja: 'しわだらけの顔。', vi: 'Gương mặt đầy những vết nhăn.' },
    ],
  },
  {
    id: 'g094',
    title: 'たとえ～ても／でも',
    meaning: 'Cho dù... đi nữa thì cũng',
    structure: [
      'たとえ + Vても、～',
      'たとえ + N／Aな + でも、～',
      'たとえ + Aい → くても、～',
    ],
    explanation:
      'Dùng khi muốn nhấn mạnh rằng một sự việc vẫn xảy ra bất chấp điều kiện giả định nào đó. Nhấn mạnh sự khẳng định.',
    examples: [
      { ja: 'たとえ寒くても、泳ぎます。', vi: 'Cho dù trời có lạnh thì tôi vẫn bơi.' },
      { ja: 'たとえ雪が降っても、仕事は休めません。', vi: 'Cho dù trời có tuyết đi nữa thì vẫn không thể nghỉ làm.' },
      { ja: 'たとえお金がなくても、幸せに暮らせる方法はあるはずだ。', vi: 'Dù không có tiền thì chắc chắn vẫn có cách để sống hạnh phúc.' },
      { ja: 'たとえ雨でも、自転車で行きます。', vi: 'Cho dù trời mưa thì tôi vẫn đi bằng xe đạp.' },
      { ja: 'たとえ困難でも、最後まで頑張りたい。', vi: 'Dù có khó khăn đi nữa thì tôi vẫn sẽ cố gắng.' },
    ],
  },
  {
    id: 'g095',
    title: '～とか',
    meaning: 'Nghe nói là / Hình như là',
    structure: [
      'Vる／Vた + とか',
      'Aい + とか',
      'Aな + だとか',
      'N + だとか',
    ],
    explanation:
      'Dùng để truyền đạt thông tin nghe được từ người khác một cách không chắc chắn, mang tính đồn đại. Ít trang trọng hơn そうだ.',
    examples: [
      { ja: '来週テストがあるとか。', vi: 'Nghe nói tuần sau có bài kiểm tra.' },
      { ja: '彼女は来月結婚するとか。', vi: 'Nghe nói cô ấy tháng sau kết hôn.' },
      { ja: 'あの店は安いとか。', vi: 'Hình như cửa hàng đó rẻ.' },
    ],
  },
  {
    id: 'g096',
    title: '～かのように／かのような／かのようだ',
    meaning: 'Cứ như thể là / Giống như thể là',
    structure: [
      'V／Aい／Aな + かのように',
      'N + であるかのように',
    ],
    explanation:
      'So sánh ví von, diễn tả sự vật giống như thể là cái gì đó (thực ra không phải). Trang trọng hơn みたい.',
    examples: [
      { ja: '彼は何も知らないかのように振る舞った。', vi: 'Anh ta hành xử như thể không biết gì.' },
      { ja: '彼女は女王であるかのように話す。', vi: 'Cô ấy nói chuyện như thể là nữ hoàng.' },
      { ja: 'まるで夢であるかのようだった。', vi: 'Cứ như thể là giấc mơ vậy.' },
    ],
  },
  {
    id: 'g097',
    title: '～わけだ',
    meaning: 'Thảo nào / Thì ra là / Nói cách khác',
    structure: [
      'V thể thường + わけだ',
      'Aい + わけだ',
      'Aな + な + わけだ',
      'N + な／である + わけだ',
    ],
    explanation:
      'Dùng khi: (1) Phát hiện nguyên nhân "Thảo nào, hèn chi"; (2) Kết luận logic; (3) Nói cách khác; (4) Hệ quả tất yếu.',
    examples: [
      { ja: 'このエアコン、20年前のだ。こわれるわけだ。', vi: 'Cái điều hòa này từ 20 năm trước rồi. Thảo nào mà bị hỏng.' },
      { ja: '暑いわけだ。気温が36度もある。', vi: 'Thảo nào mà nóng thế. Nhiệt độ lên đến 36 độ.' },
      { ja: 'あんなに食べたら太るわけだ。', vi: 'Ăn nhiều như thế thì béo là phải.' },
      { ja: '彼は日本に10年住んでいるから、日本語が上手なわけだ。', vi: 'Anh ấy sống ở Nhật 10 năm rồi, thảo nào tiếng Nhật giỏi thế.' },
    ],
  },
  {
    id: 'g098',
    title: '～ばかりだ',
    meaning: 'Ngày càng / Cứ ngày càng / Không ngừng',
    structure: [
      'Vる + ばかりだ',
    ],
    explanation:
      'Diễn tả sự thay đổi liên tục theo một hướng (thường tiêu cực), tình hình ngày càng tệ đi hoặc ngày càng tăng.',
    examples: [
      { ja: '最近、物価は上がるばかりだ。', vi: 'Gần đây giá cả cứ ngày càng tăng.' },
      { ja: '病状は悪くなるばかりだ。', vi: 'Bệnh tình ngày càng xấu đi.' },
      { ja: '日本語を使わないので、忘れるばかりだ。', vi: 'Vì không dùng tiếng Nhật nên ngày càng quên.' },
    ],
  },
  {
    id: 'g099',
    title: '～というわけだ',
    meaning: 'Nghĩa là / Vậy là / Nói cách khác / Lý do là',
    structure: [
      'V／A／N + というわけだ',
    ],
    explanation:
      'Dùng để giải thích, tóm tắt hoặc kết luận từ thông tin trước đó. Tương tự "つまり" (nghĩa là).',
    examples: [
      { ja: '彼は3年間日本に住んでいた。日本語が上手なのは、そういうわけだ。', vi: 'Anh ấy đã sống ở Nhật 3 năm. Thảo nào tiếng Nhật giỏi, lý do là vậy.' },
      { ja: 'つまり、来月から値上げするというわけですね。', vi: 'Nói cách khác là từ tháng sau sẽ tăng giá đúng không?' },
    ],
  },
  {
    id: 'g100',
    title: '～も～ば～も／も～なら～も',
    meaning: 'Cũng... mà cũng / Vừa... vừa',
    structure: [
      'N + も + Vば + N + も + V',
      'N + も + Aければ + N + も + A',
      'N + も + Vなら + N + も + V',
    ],
    explanation:
      'Liệt kê hai hoặc nhiều sự việc cùng đúng, nhấn mạnh cả hai mặt đều có. Thường dùng để khen hoặc chê.',
    examples: [
      { ja: '彼は頭もよければ、スポーツもできる。', vi: 'Anh ấy vừa thông minh vừa giỏi thể thao.' },
      { ja: '彼女は歌も上手なら、ダンスも上手だ。', vi: 'Cô ấy hát cũng giỏi mà nhảy cũng giỏi.' },
      { ja: 'あの店は味もよければ、サービスもいい。', vi: 'Quán đó vừa ngon vừa phục vụ tốt.' },
    ],
  },
  {
    id: 'g101',
    title: '～というN',
    meaning: 'Là / Rằng / Cho rằng / Nói rằng',
    structure: [
      'V／A thể thường + という + N',
    ],
    explanation:
      'Dùng để bổ nghĩa cho danh từ phía sau, giải thích nội dung hoặc ý nghĩa cụ thể. Tương tự mệnh đề quan hệ trong tiếng Việt.',
    examples: [
      { ja: '日本語が上手になりたいという気持ちがある。', vi: 'Tôi có mong muốn muốn giỏi tiếng Nhật.' },
      { ja: '明日テストがあるという話を聞いた。', vi: 'Tôi nghe nói là ngày mai có bài kiểm tra.' },
      { ja: '彼が来ないという連絡があった。', vi: 'Có liên lạc nói rằng anh ấy không đến.' },
    ],
  },
  {
    id: 'g102',
    title: 'せいぜい',
    meaning: 'Tối đa / Hết mức / Nhiều lắm cũng chỉ / Cố gắng',
    structure: [
      'せいぜい + V／N',
    ],
    explanation:
      'Có 2 nghĩa: (1) Giới hạn tối đa "nhiều lắm cũng chỉ"; (2) Khuyến khích "hãy cố gắng hết sức".',
    examples: [
      { ja: 'せいぜい頑張ってください。', vi: 'Hãy cố gắng hết sức nhé.' },
      { ja: 'この仕事の給料はせいぜい20万円だ。', vi: 'Lương công việc này nhiều lắm cũng chỉ 20 vạn yên.' },
      { ja: '彼が走れるのはせいぜい5キロぐらいだ。', vi: 'Anh ấy chạy được nhiều nhất cũng chỉ khoảng 5km.' },
    ],
  },
  {
    id: 'g103',
    title: 'あとは～だけ',
    meaning: 'Chỉ còn... nữa là xong',
    structure: [
      'あとは + V／N + だけ',
    ],
    explanation:
      'Diễn tả việc còn lại duy nhất cần làm để hoàn thành. Thường dùng khi hầu hết công việc đã xong.',
    examples: [
      { ja: 'あとは名前を書くだけです。', vi: 'Chỉ còn viết tên nữa là xong.' },
      { ja: '準備は全部できた。あとは出発するだけだ。', vi: 'Chuẩn bị xong hết rồi. Chỉ còn xuất phát thôi.' },
      { ja: 'あとは結果を待つだけです。', vi: 'Chỉ còn đợi kết quả nữa thôi.' },
    ],
  },
  {
    id: 'g104',
    title: '～だけでいい',
    meaning: 'Chỉ cần... là được / Là đủ',
    structure: [
      'V／N + だけでいい',
    ],
    explanation:
      'Diễn tả việc chỉ cần một điều kiện tối thiểu là đủ, không cần thêm gì khác.',
    examples: [
      { ja: '見るだけでいいです。', vi: 'Chỉ cần nhìn thôi là được.' },
      { ja: '名前だけでいいですか。', vi: 'Chỉ cần tên thôi là được phải không?' },
      { ja: 'そばにいてくれるだけでいい。', vi: 'Chỉ cần ở bên cạnh tôi là đủ rồi.' },
    ],
  },
  {
    id: 'g105',
    title: '～てもらえない？／てくれない？',
    meaning: 'Cho tôi... được không? / Giúp tôi... với',
    structure: [
      'Vて + もらえない？／もらえませんか？',
      'Vて + くれない？／くれませんか？',
    ],
    explanation:
      'Cách nhờ vả, yêu cầu ai đó làm gì. てもらえませんか trang trọng hơn てくれない.',
    examples: [
      { ja: 'ちょっと手伝ってもらえませんか。', vi: 'Bạn giúp tôi một chút được không?' },
      { ja: 'この漢字の読み方を教えてくれない？', vi: 'Dạy tôi cách đọc chữ kanji này được không?' },
      { ja: '写真を撮ってもらえますか。', vi: 'Bạn chụp ảnh giúp tôi được không?' },
    ],
  },
  {
    id: 'g106',
    title: '～ても～ても',
    meaning: 'Dù... bao nhiêu lần thì vẫn / Mãi cũng vẫn',
    structure: [
      'Vても + Vても',
    ],
    explanation:
      'Lặp lại cùng một hành động hoặc hai hành động khác nhau để nhấn mạnh rằng bất chấp mọi nỗ lực, kết quả vẫn không thay đổi.',
    examples: [
      { ja: '食べても食べてもお腹がすく。', vi: 'Ăn bao nhiêu vẫn đói.' },
      { ja: '読んでも読んでも覚えられない。', vi: 'Đọc bao nhiêu lần cũng không nhớ được.' },
      { ja: '待っても待っても来なかった。', vi: 'Đợi mãi mà vẫn không đến.' },
    ],
  },
  {
    id: 'g107',
    title: '～てしょうがない／てしかたがない',
    meaning: 'Không thể chịu nổi / Vô cùng / Không biết phải làm sao',
    structure: [
      'Vて + しょうがない／しかたがない',
      'Aくて + しょうがない／しかたがない',
      'Aで + しょうがない／しかたがない',
    ],
    explanation:
      'Diễn tả cảm xúc hoặc cảm giác mãnh liệt đến mức không kiểm soát được. Thường dùng với cảm xúc, cảm giác.',
    examples: [
      { ja: '暑くてしょうがない。', vi: 'Nóng không chịu nổi.' },
      { ja: '子どものことが心配でしかたがない。', vi: 'Lo lắng cho con không sao ngăn được.' },
      { ja: '眠くてしょうがない。', vi: 'Buồn ngủ vô cùng.' },
    ],
  },
  {
    id: 'g108',
    title: '～ちゃ／じゃ',
    meaning: 'Phải / Không được / Không phải',
    structure: [
      'Vては → Vちゃ',
      'Vでは → Vじゃ',
    ],
    explanation:
      'Dạng rút gọn của ～ては và ～では trong văn nói. ～ちゃだめだ = không được làm, ～なくちゃ = phải làm.',
    examples: [
      { ja: 'そんなこと言っちゃだめだよ。', vi: 'Không được nói những điều như thế.' },
      { ja: '早く行かなくちゃ。', vi: 'Phải đi nhanh thôi.' },
      { ja: '食べすぎちゃった。', vi: 'Ăn nhiều quá mất rồi.' },
    ],
  },
  {
    id: 'g109',
    title: '～とても～ない',
    meaning: 'Không thể nào mà / Không sao có thể',
    structure: [
      'とても + Vない',
    ],
    explanation:
      'Nhấn mạnh sự bất khả thi, không thể nào thực hiện được. とても ở đây không phải nghĩa "rất" mà là "không thể nào".',
    examples: [
      { ja: 'この量はとても食べられない。', vi: 'Lượng này không thể nào ăn hết được.' },
      { ja: 'とてもそんなことはできない。', vi: 'Không thể nào làm được chuyện đó.' },
      { ja: 'あの人の話はとても信じられない。', vi: 'Không thể nào tin được câu chuyện của người đó.' },
    ],
  },
  {
    id: 'g110',
    title: '～に慣れる（になれる）',
    meaning: 'Quen với',
    structure: [
      'N + に慣れる',
      'Vる + のに慣れる',
    ],
    explanation:
      'Diễn tả việc đã trở nên quen thuộc với một hoàn cảnh, môi trường hoặc hành động nào đó.',
    examples: [
      { ja: '日本の生活に慣れましたか。', vi: 'Bạn đã quen với cuộc sống ở Nhật chưa?' },
      { ja: '早起きに慣れた。', vi: 'Tôi đã quen dậy sớm rồi.' },
      { ja: '一人暮らしに慣れるまで時間がかかった。', vi: 'Phải mất thời gian mới quen sống một mình.' },
      { ja: '箸を使うのに慣れた。', vi: 'Tôi đã quen dùng đũa rồi.' },
    ],
  },
  {
    id: 'g111',
    title: '～てはだめだ／ちゃだめだ／じゃだめだ',
    meaning: 'Không được (làm gì)',
    structure: [
      'Vて + はだめだ',
      'Vちゃ + だめだ (văn nói)',
      'Vじゃ + だめだ (văn nói)',
    ],
    explanation:
      'Dùng để cấm đoán, không cho phép ai làm gì. Dạng rút gọn ちゃ／じゃ phổ biến trong văn nói.',
    examples: [
      { ja: 'ここで写真を撮ってはだめです。', vi: 'Không được chụp ảnh ở đây.' },
      { ja: 'うそをついちゃだめだよ。', vi: 'Không được nói dối nhé.' },
      { ja: '遅刻しちゃだめだよ。', vi: 'Không được đi trễ nhé.' },
    ],
  },
  {
    id: 'g112',
    title: 'どうしても～ない',
    meaning: 'Không cách nào / Không cách gì mà',
    structure: [
      'どうしても + Vない',
    ],
    explanation:
      'Diễn tả bất chấp mọi nỗ lực cũng không thể thực hiện được. Nhấn mạnh sự bất lực hoàn toàn.',
    examples: [
      { ja: 'どうしても思い出せない。', vi: 'Không cách nào nhớ ra được.' },
      { ja: 'どうしても許せない。', vi: 'Không thể nào tha thứ được.' },
      { ja: 'どうしてもこの問題が解けない。', vi: 'Không cách nào giải được bài này.' },
    ],
  },
  {
    id: 'g113',
    title: 'どうしても～',
    meaning: 'Dẫu thế nào cũng / Bằng mọi cách / Bằng mọi giá',
    structure: [
      'どうしても + V',
    ],
    explanation:
      'Diễn tả quyết tâm mạnh mẽ, nhất định phải làm bằng được. Khác với nghĩa phủ định ở trên.',
    examples: [
      { ja: 'どうしても日本に行きたい。', vi: 'Bằng mọi giá tôi cũng muốn đi Nhật.' },
      { ja: 'どうしてもこの本が読みたい。', vi: 'Nhất định phải đọc cuốn sách này.' },
      { ja: 'どうしても彼に会いたい。', vi: 'Muốn gặp anh ấy bằng mọi giá.' },
    ],
  },
  {
    id: 'g114',
    title: '～そのくせ',
    meaning: 'Dù vậy, vậy mà / Thế nhưng lại',
    structure: [
      '文1。そのくせ + 文2',
    ],
    explanation:
      'Dùng để chỉ ra sự mâu thuẫn giữa hai vế, mang ý phê phán hoặc trách móc.',
    examples: [
      { ja: '彼は約束したくせに、来なかった。', vi: 'Anh ta đã hứa vậy mà không đến.' },
      { ja: '勉強しないくせに、文句ばかり言う。', vi: 'Không chịu học mà lúc nào cũng phàn nàn.' },
      { ja: '自分はできないくせに、人の批判ばかりする。', vi: 'Bản thân không làm được mà cứ hay chê bai người khác.' },
    ],
  },
  {
    id: 'g115',
    title: '～てしかたがない',
    meaning: 'Không thể chịu nổi / Hết sức / Vô cùng / Ôi là',
    structure: [
      'Vて + しかたがない',
      'Aくて + しかたがない',
      'Aで + しかたがない',
    ],
    explanation:
      'Tương tự ～てしょうがない, diễn tả cảm xúc hoặc cảm giác mãnh liệt không kiểm soát được.',
    examples: [
      { ja: '寂しくてしかたがない。', vi: 'Cô đơn vô cùng.' },
      { ja: '会いたくてしかたがない。', vi: 'Nhớ muốn gặp không chịu nổi.' },
      { ja: 'うれしくてしかたがない。', vi: 'Vui không tả xiết.' },
    ],
  },
  {
    id: 'g116',
    title: '～ことがある',
    meaning: 'Có lúc / Có khi / Thỉnh thoảng / Đôi khi',
    structure: [
      'V thể thường + ことがある／こともある',
      'Aな + な + ことがある',
      'Aい + ことがある',
    ],
    explanation:
      'Diễn tả hành động xảy ra không thường xuyên, thỉnh thoảng mới có. Khác với たことがある (đã từng).',
    examples: [
      { ja: '電車は予定の時間に遅れることがある。', vi: 'Thỉnh thoảng tàu đến muộn so với lịch trình.' },
      { ja: '時間がなくて、朝ごはんを食べないこともある。', vi: 'Có khi vì không có thời gian nên tôi cũng không ăn sáng.' },
      { ja: 'たまにタクシーで通勤することがある。', vi: 'Thỉnh thoảng tôi đi làm bằng taxi.' },
      { ja: '人の名前を忘れることがある。', vi: 'Đôi khi tôi cũng bị quên tên người khác.' },
    ],
  },
  {
    id: 'g117',
    title: '～というのは',
    meaning: 'Cái gọi là / Nghĩa là',
    structure: [
      '～というのは + giải thích',
    ],
    explanation:
      'Dùng để định nghĩa, giải thích ý nghĩa của một từ hoặc khái niệm.',
    examples: [
      { ja: '「花見」というのは、桜を見ることです。', vi: '"Hanami" nghĩa là ngắm hoa anh đào.' },
      { ja: '日本語の「お疲れ様」というのは何ですか。', vi: '"Otsukaresama" trong tiếng Nhật là gì?' },
    ],
  },
  {
    id: 'g118',
    title: '～というものだ',
    meaning: 'Là / Chính là / Đó mới là',
    structure: [
      '～というものだ',
    ],
    explanation:
      'Nhấn mạnh bản chất của sự vật, thường dùng để bày tỏ ý kiến hoặc nhận xét mang tính chân lý.',
    examples: [
      { ja: 'それが人生というものだ。', vi: 'Đó chính là cuộc đời.' },
      { ja: '努力なしで成功するのは無理というものだ。', vi: 'Thành công mà không nỗ lực thì là điều không thể.' },
    ],
  },
  {
    id: 'g119',
    title: '～というと',
    meaning: 'Nói đến / Nhắc đến',
    structure: [
      'N + というと',
      'N + といえば',
    ],
    explanation:
      'Dùng để dẫn dắt chủ đề, khi nhắc đến một điều gì thì liên tưởng đến điều khác.',
    examples: [
      { ja: '日本というと、富士山を思い出す。', vi: 'Nhắc đến Nhật Bản, tôi nghĩ ngay đến núi Phú Sĩ.' },
      { ja: '夏というと、海だね。', vi: 'Nói đến mùa hè là nghĩ đến biển nhỉ.' },
    ],
  },
  {
    id: 'g120',
    title: '命令形 + と言われる／注意される',
    meaning: 'Bị bảo phải / Bị nhắc nhở',
    structure: [
      'Vる／Vない + ように言われる',
      'Vろ／Vるな + と言われる',
    ],
    explanation:
      'Dùng thể bị động để truyền đạt lại lời yêu cầu, mệnh lệnh hoặc nhắc nhở từ người khác.',
    examples: [
      { ja: '先生に宿題を出すように言われた。', vi: 'Tôi bị thầy giáo bảo nộp bài tập.' },
      { ja: '医者にお酒を飲まないように注意された。', vi: 'Bị bác sĩ nhắc nhở không nên uống rượu.' },
      { ja: '母に早く寝ろと言われた。', vi: 'Bị mẹ bảo đi ngủ sớm.' },
    ],
  },
  {
    id: 'g121',
    title: '～てくれと頼まれる／言われる',
    meaning: 'Được nhờ / Bị bảo',
    structure: [
      'Vて + くれと頼まれる',
      'Vて + くれと言われる',
    ],
    explanation:
      'Truyền đạt lại việc bị ai đó nhờ vả hoặc yêu cầu làm gì. Dùng thể bị động.',
    examples: [
      { ja: '友達に引っ越しを手伝ってくれと頼まれた。', vi: 'Bị bạn nhờ giúp chuyển nhà.' },
      { ja: '先輩にレポートを見てくれと言われた。', vi: 'Bị tiền bối bảo xem giúp báo cáo.' },
    ],
  },
  {
    id: 'g122',
    title: '～ないで／なくて／ず／ずに',
    meaning: 'Không (làm gì) mà / Mà không',
    structure: [
      'Vないで + V',
      'Vなくて + V',
      'Vず(に) + V',
    ],
    explanation:
      'Diễn tả hành động thay thế (làm B mà không làm A). ないで thường dùng hơn, ず／ずに là dạng trang trọng hơn.',
    examples: [
      { ja: '朝ごはんを食べないで学校に行った。', vi: 'Không ăn sáng mà đi học.' },
      { ja: '辞書を使わずに翻訳した。', vi: 'Dịch mà không dùng từ điển.' },
      { ja: '何も言わないで出て行った。', vi: 'Không nói gì mà bỏ đi.' },
    ],
  },
  {
    id: 'g123',
    title: 'いくら～ても',
    meaning: 'Dù có bao nhiêu / Dù có đến đâu đi nữa thì',
    structure: [
      'いくら + Vても',
      'いくら + Aくても',
      'いくら + Aでも',
    ],
    explanation:
      'Nhấn mạnh rằng bất chấp mức độ nào, kết quả vẫn không thay đổi.',
    examples: [
      { ja: 'いくら食べても太らない。', vi: 'Dù ăn bao nhiêu cũng không béo.' },
      { ja: 'いくら説明しても分からない。', vi: 'Dù giải thích thế nào cũng không hiểu.' },
      { ja: 'いくら高くてもこれが欲しい。', vi: 'Dù đắt bao nhiêu tôi cũng muốn cái này.' },
    ],
  },
  {
    id: 'g124',
    title: '～れる／られる（自発）',
    meaning: 'Chợt thấy / Bỗng thấy / Cảm thấy',
    structure: [
      'Vれる／Vられる (自発)',
    ],
    explanation:
      'Dạng tự phát (không phải bị động), diễn tả hành động xảy ra tự nhiên, không cố ý. Thường dùng với 思う、考える、感じる.',
    examples: [
      { ja: '故郷のことが思い出される。', vi: 'Bỗng nhớ đến quê hương.' },
      { ja: '春になると、花見に行きたいと思われる。', vi: 'Đến mùa xuân, tự nhiên thấy muốn đi ngắm hoa.' },
      { ja: '彼の将来が案じられる。', vi: 'Lo lắng cho tương lai của anh ấy.' },
    ],
  },
  {
    id: 'g125',
    title: 'どうせ～',
    meaning: 'Đằng nào thì / Dù thế nào thì / Dù thế nào đi nữa',
    structure: [
      'どうせ + V／文',
    ],
    explanation:
      'Thể hiện thái độ cam chịu, cho rằng kết quả đã được định sẵn dù có làm gì đi nữa. Mang tính tiêu cực, buông xuôi.',
    examples: [
      { ja: 'どうせ無理だよ。', vi: 'Đằng nào cũng vô ích thôi.' },
      { ja: 'どうせ行くなら、楽しもう。', vi: 'Đã đi rồi thì hãy vui vẻ đi.' },
      { ja: 'どうせ誰も来ないだろう。', vi: 'Chắc là không ai đến đâu.' },
    ],
  },
  {
    id: 'g126',
    title: '～など～ない',
    meaning: 'Nào... nào kia / Chẳng chút nào',
    structure: [
      'N + など + Vない',
    ],
    explanation:
      'Dùng など với phủ định để nhấn mạnh sự phủ nhận, coi thường hoặc khiêm tốn.',
    examples: [
      { ja: 'あの人のことなど知らない。', vi: 'Tôi chẳng biết người đó.' },
      { ja: '私など何もできません。', vi: 'Tôi thì chẳng làm được gì đâu.' },
      { ja: 'そんなことなど気にしない。', vi: 'Chuyện như thế tôi chẳng quan tâm.' },
    ],
  },
  {
    id: 'g127',
    title: '～にしては',
    meaning: 'Tuy... nhưng / Tuy vậy mà',
    structure: [
      'V／N／A + にしては',
    ],
    explanation:
      'Diễn tả kết quả trái với kỳ vọng, không phù hợp với tiêu chuẩn thông thường. Khác với わりに ở chỗ mang tính bất ngờ hơn.',
    examples: [
      { ja: '日本人にしては背が高い。', vi: 'Là người Nhật nhưng cao nhỉ.' },
      { ja: '初めてにしてはよくできた。', vi: 'Lần đầu mà làm khá tốt.' },
      { ja: '子供にしてはしっかりしている。', vi: 'Là trẻ con nhưng chững chạc thật.' },
    ],
  },
  {
    id: 'g128',
    title: '～としたら／～とすれば',
    meaning: 'Giả sử / Nếu',
    structure: [
      'V／A／N + としたら',
      'V／A／N + とすれば',
    ],
    explanation:
      'Đặt giả thiết để suy luận, tương tự "nếu giả sử". とすれば trang trọng hơn としたら.',
    examples: [
      { ja: 'もし宝くじに当たったとしたら、何がしたい？', vi: 'Giả sử trúng xổ số thì bạn muốn làm gì?' },
      { ja: '彼が本当のことを言っているとすれば、大変なことだ。', vi: 'Nếu anh ấy nói sự thật thì đó là chuyện nghiêm trọng.' },
    ],
  },
  {
    id: 'g129',
    title: '～まま',
    meaning: 'Vẫn / Cứ để nguyên như thế / Theo như',
    structure: [
      'Vた + まま',
      'Vない + まま',
      'N + の + まま',
      'Aな + な + まま',
      'Aい + まま',
    ],
    explanation:
      'Diễn tả trạng thái được duy trì không thay đổi, hoặc hành động được thực hiện trong khi giữ nguyên trạng thái nào đó.',
    examples: [
      { ja: 'このままずっと君といっしょにいたい。', vi: 'Em muốn ở cùng anh như thế này mãi.' },
      { ja: '10年ぶりにあったが、彼女は昔のままだった。', vi: 'Đã 10 năm rồi mới gặp lại nhưng cô ấy vẫn như xưa.' },
      { ja: '昨夜テレビをつけたまま寝てしまった。', vi: 'Tối qua tôi để nguyên TV mở và ngủ quên mất.' },
      { ja: '自分の思うままに振る舞うな。', vi: 'Đừng có mà hành xử theo ý mình như thế.' },
    ],
  },
  {
    id: 'g130',
    title: '～たりなんかして',
    meaning: 'Chẳng hạn / Nào kia / Chẳng hạn',
    structure: [
      'Vたり + なんかして',
      'N + だったり + なんかして',
    ],
    explanation:
      'Đưa ra ví dụ minh họa một cách nhẹ nhàng, thường dùng trong văn nói.',
    examples: [
      { ja: '映画を見たりなんかして過ごした。', vi: 'Đã dành thời gian xem phim chẳng hạn.' },
      { ja: '散歩したりなんかして、リラックスした。', vi: 'Đi dạo chẳng hạn, rồi thư giãn.' },
    ],
  },
  {
    id: 'g131',
    title: '～っぱなし',
    meaning: 'Suốt / Cứ nguyên như thế / Để mặc',
    structure: [
      'Vます + っぱなし',
    ],
    explanation:
      'Diễn tả trạng thái được để mặc không thay đổi, thường mang ý tiêu cực (bất cẩn, lười biếng).',
    examples: [
      { ja: 'ドアを開けっぱなしにしないで。', vi: 'Đừng để cửa mở mặc thế.' },
      { ja: '電気をつけっぱなしで寝てしまった。', vi: 'Để đèn bật mà ngủ mất.' },
      { ja: '立ちっぱなしで疲れた。', vi: 'Đứng suốt nên mệt quá.' },
    ],
  },
  {
    id: 'g132',
    title: '～ふりをする',
    meaning: 'Giả vờ / Tỏ vẻ',
    structure: [
      'V thể thường + ふりをする',
      'Aい + ふりをする',
      'Aな + ふりをする',
      'N + の + ふりをする',
    ],
    explanation:
      'Diễn tả hành động giả vờ, đóng giả làm ai hoặc tỏ ra như thế nào.',
    examples: [
      { ja: '知らないふりをする。', vi: 'Giả vờ không biết.' },
      { ja: '寝ているふりをした。', vi: 'Giả vờ đang ngủ.' },
      { ja: '元気なふりをしている。', vi: 'Tỏ vẻ khỏe mạnh.' },
    ],
  },
  {
    id: 'g133',
    title: '～なんで／なんて',
    meaning: 'Cái thứ như / Cái gọi là',
    structure: [
      'N + なんて',
      'V + なんて',
    ],
    explanation:
      'Thể hiện sự ngạc nhiên, coi thường, hoặc khiêm tốn về điều được nhắc đến.',
    examples: [
      { ja: '日本語なんて簡単だよ。', vi: 'Tiếng Nhật chỉ là chuyện nhỏ thôi.' },
      { ja: '彼が来るなんて信じられない。', vi: 'Không thể tin được là anh ấy đến.' },
      { ja: '私なんてまだまだです。', vi: 'Tôi thì còn kém lắm.' },
    ],
  },
  {
    id: 'g134',
    title: '～など',
    meaning: 'Chẳng hạn như / Nào nọ nào kia',
    structure: [
      'N + など',
      'V + など',
    ],
    explanation:
      'Đưa ra ví dụ, tương tự ～とか nhưng trang trọng hơn. Cũng dùng để thể hiện sự khiêm tốn hoặc coi thường.',
    examples: [
      { ja: '東京や大阪などの大きい都市に行きたい。', vi: 'Tôi muốn đi các thành phố lớn như Tokyo, Osaka chẳng hạn.' },
      { ja: '私などにはとてもできません。', vi: 'Người như tôi thì không thể làm được đâu.' },
    ],
  },
  {
    id: 'g135',
    title: 'なんか',
    meaning: 'Ví dụ như / Chẳng hạn như',
    structure: [
      'N + なんか',
    ],
    explanation:
      'Dạng văn nói của など, dùng để đưa ra ví dụ hoặc thể hiện thái độ coi thường, khiêm tốn.',
    examples: [
      { ja: 'コーヒーなんかどう？', vi: 'Uống cà phê chẳng hạn thì sao?' },
      { ja: '私なんか全然わからない。', vi: 'Tôi thì hoàn toàn không hiểu gì cả.' },
      { ja: 'テレビなんか見たくない。', vi: 'Chẳng muốn xem tivi gì cả.' },
    ],
  },
  {
    id: 'g136',
    title: '～こと（命令・禁止）',
    meaning: 'Phải làm gì / Không được làm gì',
    structure: [
      'Vる + こと (mệnh lệnh)',
      'Vない + こと (cấm)',
    ],
    explanation:
      'Dùng trong thông báo, quy định, mệnh lệnh gián tiếp. ～ること = phải làm, ～ないこと = không được làm.',
    examples: [
      { ja: 'レポートは金曜日までに提出すること。', vi: 'Báo cáo phải nộp trước thứ Sáu.' },
      { ja: '教室で食べないこと。', vi: 'Không được ăn trong lớp học.' },
      { ja: '必ず名前を書くこと。', vi: 'Nhất định phải viết tên.' },
    ],
  },
  {
    id: 'g137',
    title: '～ことだ（忠告）',
    meaning: 'Nên / Không nên làm gì',
    structure: [
      'Vる + ことだ (nên)',
      'Vない + ことだ (không nên)',
    ],
    explanation:
      'Dùng để khuyên nhủ, đưa ra lời khuyên. Nhẹ nhàng hơn ～べきだ.',
    examples: [
      { ja: '健康のためには、早く寝ることだ。', vi: 'Vì sức khỏe, nên ngủ sớm.' },
      { ja: '試験に受かりたいなら、もっと勉強することだ。', vi: 'Muốn đỗ thì nên học nhiều hơn.' },
      { ja: '夜遅く食べないことだ。', vi: 'Không nên ăn khuya.' },
    ],
  },
  {
    id: 'g138',
    title: '～ことだ（感嘆）',
    meaning: 'Cảm giác thật là / Thật là',
    structure: [
      'Aい + ことだ',
      'Aな + ことだ',
    ],
    explanation:
      'Dùng để bày tỏ cảm xúc (ngạc nhiên, vui, buồn...) về một sự việc.',
    examples: [
      { ja: '合格できて嬉しいことだ。', vi: 'Đỗ được thật là vui.' },
      { ja: '残念なことだ。', vi: 'Thật là đáng tiếc.' },
    ],
  },
  {
    id: 'g139',
    title: '～やなんか',
    meaning: 'Và / Đại loại / Hay / Nào kia / Nào nọ',
    structure: [
      'N + や + N + なんか',
    ],
    explanation:
      'Liệt kê một số ví dụ trong nhiều thứ, mang tính không đầy đủ. Văn nói.',
    examples: [
      { ja: 'パンやコーヒーなんか買ってきて。', vi: 'Mua bánh mì, cà phê đại loại thế.' },
      { ja: '本やマンガやなんかが好きです。', vi: 'Tôi thích sách, manga đại loại vậy.' },
    ],
  },
  {
    id: 'g140',
    title: '～っけ',
    meaning: 'Hình như / Có phải / Đúng không',
    structure: [
      'V／A／N + っけ',
    ],
    explanation:
      'Dùng khi cố nhớ lại một thông tin đã biết nhưng không chắc. Văn nói.',
    examples: [
      { ja: '明日のテスト、何時からだっけ？', vi: 'Bài kiểm tra ngày mai mấy giờ nhỉ?' },
      { ja: '彼の名前、何だっけ？', vi: 'Tên anh ấy là gì nhỉ?' },
      { ja: 'この映画、見たことあったっけ？', vi: 'Phim này xem rồi phải không nhỉ?' },
    ],
  },
]
