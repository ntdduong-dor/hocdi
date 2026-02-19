import type { GrammarPoint } from '../../types/grammar'

export const n3Grammar: GrammarPoint[] = [
  {
    id: 'g001',
    title: '～うちに',
    meaning: 'Trong lúc / Trong khi / Trước khi / Nhân lúc',
    structure: [
      'Vる + うちに',
      'Vている + うちに',
      'Vない + うちに',
      'Aい + うちに',
      'Aな + うちに',
      'N + の + うちに',
    ],
    explanation:
      'Cách dùng 1: Diễn tả hành động có chủ đích thực hiện trong khi trạng thái chưa thay đổi, mang ý nghĩa "trong khi còn ở trạng thái nào đó, hãy chủ động làm gì đó". Cách dùng 2: Diễn tả trong khi hành động A đang diễn ra thì sự việc B tự nhiên xảy ra hoặc thay đổi.',
    examples: [
      { ja: '若いうちに勉強しておきなさい。', vi: 'Trong lúc (Nhân lúc) còn trẻ thì hãy học đi.' },
      { ja: '雨が降らないうちに帰りましょう。', vi: 'Trước khi trời mưa thì hãy về nhà thôi.' },
      { ja: '日本にいるうちに富士山に登りましょう。', vi: 'Trong khi còn ở Nhật thì hãy leo núi Phú Sĩ đi.' },
      { ja: '元気なうちに海外旅行しようと思っています。', vi: 'Tôi sẽ đi du lịch nước ngoài khi còn khỏe mạnh.' },
      { ja: '熱いうちに早く食べましょう。', vi: 'Hãy ăn ngay khi còn nóng.' },
      { ja: '暗くならないうちに家に帰りましょう！', vi: 'Chúng ta hãy về nhà trước khi trời tối.' },
      { ja: '子供が寝ているうちに、掃除をしてしまいましょう。', vi: 'Trong khi con còn đang ngủ thì chúng ta hãy dọn dẹp cho xong nào.' },
      { ja: '花がきれいなうちに、花見に行きたい。', vi: 'Tôi muốn đi ngắm hoa khi hoa vẫn còn đang đẹp.' },
      { ja: '気がつかないうちに、30歳になった。', vi: 'Trước khi kịp nhận ra thì đã bước sang tuổi 30 rồi.' },
      { ja: '難しい本を読んでいるうちに、眠くなります。', vi: 'Trong khi đang đọc sách khó thì tôi đã buồn ngủ mất.' },
      { ja: 'お酒を飲んでいるうちに、顔が赤くなります。', vi: 'Trong lúc đang uống rượu thì mặt dần dần trở nên đỏ.' },
      { ja: '彼女の話を聞いているうちに、涙が出てきました。', vi: 'Tôi đã rơi nước mắt trong khi nghe cô ấy kể.' },
      { ja: 'しばらく会わないうちに、日本語が上手になりましたね。', vi: 'Sau một thời gian dài không gặp thì tiếng Nhật cậu đã giỏi lên nhỉ.' },
    ],
  },
  {
    id: 'g002',
    title: '～間（あいだ）/ ～間に（あいだに）',
    meaning: 'Trong lúc / Trong khi / Trong thời gian... thì...',
    structure: [
      'Vる + 間（あいだ）',
      'Vている + 間（あいだ）',
      'Vない + 間（あいだ）',
      'Aい + 間（あいだ）',
      'Aな + 間（あいだ）',
      'N + の + 間（あいだ）',
    ],
    explanation:
      'Diễn tả một hành động diễn ra liên tục trong khi một hành động khác đang xảy ra. ～間 nhấn mạnh suốt khoảng thời gian, ～間に nhấn mạnh một thời điểm trong khoảng thời gian đó.',
    examples: [
      { ja: 'お母さんが昼寝をしている間、子供たちはテレビを見ていた。', vi: 'Trong lúc mẹ đang ngủ trưa, bọn trẻ xem tivi.' },
      { ja: '昨日は、家にいる間、ずっと本を読んでいました。', vi: 'Hôm qua, trong khi ở nhà, tôi đã đọc sách suốt.' },
      { ja: '子供が小さい間は、ペットを飼わないつもりです。', vi: 'Trong khi con còn nhỏ, tôi dự định không nuôi thú cưng.' },
      { ja: '先生が話している間は、よく話を聞いてください。', vi: 'Trong lúc thầy giáo đang nói thì hãy chú ý lắng nghe.' },
      { ja: 'わたしが旅行で留守の間、うちの犬の世話をお願いできないでしょうか。', vi: 'Trong lúc tôi đi du lịch, bạn có trông con chó giúp được không?' },
      { ja: '夏休みのあいだ、弟は毎日プールで泳いでいた。', vi: 'Trong suốt thời gian nghỉ hè, em trai tôi ngày nào cũng đi bơi.' },
      { ja: '私が洗濯している間に、買い物に行って来て。', vi: 'Trong thời gian em giặt đồ thì anh hãy đi chợ đi.' },
      { ja: '彼が出かけている間に、わたしはずっと手紙を書いていた。', vi: 'Trong thời gian anh ấy đi ra ngoài thì tôi đã ngồi viết thư suốt.' },
      { ja: 'この15年の間に何があったのでしょうか。', vi: 'Tôi tự hỏi không biết đã có gì xảy ra trong 15 năm qua.' },
      { ja: '私は長い間彼女を待っていた。', vi: 'Tôi đã đợi cô ấy lâu rồi.' },
    ],
  },
  {
    id: 'g003',
    title: '～によって／により／による',
    meaning: 'Bằng, qua, thông qua / Vì, do / Tùy theo / Bởi (bị động)',
    structure: [
      'N + によって',
      'N + によっては',
      'N + により',
      'N1 + による + N2',
    ],
    explanation:
      'Có 4 cách dùng chính: (1) Chỉ phương tiện, cách thức: bằng, qua, thông qua. (2) Chỉ nguyên nhân: vì, do. (3) Chỉ sự thay đổi, khác biệt: tùy thuộc vào, thay đổi theo. (4) Chỉ chủ thể trong câu bị động: bởi, do. Dạng ～により mang sắc thái trang trọng, dùng trong văn viết. Dạng ～による + N dùng để bổ nghĩa cho danh từ.',
    examples: [
      { ja: 'インターネットによって、レストランやホテルを予約することができます。', vi: 'Qua internet có thể đặt chỗ ở nhà hàng và khách sạn.' },
      { ja: '失敗することによって、成功に近づきます。', vi: 'Thông qua thất bại chúng ta có thể đến gần hơn với thành công.' },
      { ja: '毎日、復習することによって日本語が上達します。', vi: 'Bằng việc luyện tập hàng ngày, tiếng Nhật đã tiến bộ.' },
      { ja: '地震によって、ビルが壊れました。', vi: 'Tòa nhà bị hỏng vì động đất.' },
      { ja: '台風によって、橋が壊れました。', vi: 'Cây cầu bị hỏng do bão.' },
      { ja: '大雨による被害は、予想より大きかった。', vi: 'Thiệt hại do mưa lớn gây ra lớn hơn dự đoán.' },
      { ja: '人によって、考え方が違います。', vi: 'Mỗi người có một cách suy nghĩ khác nhau.' },
      { ja: '国によって習慣が違う。', vi: 'Tùy theo từng nước, tập quán khác nhau.' },
      { ja: '曜日によって、ランチのメニューが変わります。', vi: 'Thực đơn bữa trưa thay đổi theo từng ngày trong tuần.' },
      { ja: 'モナリザはレオナルド・ダビンチによって、描かれました。', vi: 'Bức tranh nàng Monalisa do Leonardo Davinci vẽ.' },
      { ja: 'この建物は有名な建築家によって設計された。', vi: 'Tòa nhà này được thiết kế bởi một kiến trúc sư nổi tiếng.' },
      { ja: 'アメリカ大陸はコロンブスによって発見された。', vi: 'Châu Mỹ đã được phát hiện bởi Columbus.' },
    ],
  },
  {
    id: 'g004',
    title: '～たびに',
    meaning: 'Cứ mỗi lần… thì… / Cứ hễ… thì…',
    structure: [
      'Vる（動詞辞書形）+ たびに',
      'N + の + たびに',
    ],
    explanation:
      'Diễn tả sự việc xảy ra thường xuyên, có tính lặp đi lặp lại theo quy luật. Nhấn mạnh rằng mỗi lần hành động A xảy ra thì kết quả B cũng xảy ra theo, không có ngoại lệ.',
    examples: [
      { ja: 'コンビニへ行くたびに、つい買いすぎてしまう。', vi: 'Cứ lần nào đi ra konbini là lại vô tình mua quá tay.' },
      { ja: 'この本を読むたびに、彼のことを思い出す。', vi: 'Mỗi lần đọc cuốn sách này tôi lại nhớ đến anh ấy.' },
      { ja: '山田さんは会うたびに髪型が違う。', vi: 'Cứ lần nào gặp Yamada là cậu ấy lại có kiểu tóc khác.' },
      { ja: '歩くたびに腰が痛くなって、動けなくなる。', vi: 'Cứ mỗi khi đi bộ là hông lại đau, không thể di chuyển được.' },
      { ja: '人は失敗するたびに成長していく。', vi: 'Con người ta cứ mỗi lần thất bại là sẽ trưởng thành hơn.' },
      { ja: 'テストで悪い点をとるたびに、「もっと頑張ろう」と思った。', vi: 'Mỗi khi bị điểm kém trong kì thi là tôi lại nghĩ "Hãy cố gắng hơn".' },
      { ja: '健康診断のたびに、太りすぎだと言われる。', vi: 'Cứ mỗi lần đi khám sức khỏe, tôi lại bị phán là quá mập.' },
      { ja: 'この地方は台風が来るたびに大水の害が起こる。', vi: 'Ở địa phương này, cứ mỗi lần bão tới là thiệt hại do lũ lại xảy ra.' },
      { ja: '父は出張のたびに必ずその土地の土産を買ってくる。', vi: 'Mỗi lần đi công tác, ba tôi cũng lại mua về một món quà đặc sản vùng đó.' },
      { ja: 'この写真を見るたびに、昔のことを思い出す。', vi: 'Mỗi lần nhìn tấm ảnh này là một lần nhớ lại chuyện xưa.' },
      { ja: 'ふるさとは帰るたびに変わっていて、昔の長閑な風景がだんだんなくなっていく。', vi: 'Mỗi lần về thăm là lại một lần nhận thấy quê nhà đổi khác.' },
    ],
  },
  {
    id: 'g005',
    title: '～ば～ほど',
    meaning: 'Càng… càng…',
    structure: [
      'Vば（動詞仮定形）+ Vる（動詞辞書形）+ ほど',
      'Aい → Aければ + Aい + ほど',
      'Aな → Aなら（ば）+ Aな + ほど',
      '（省略形）Vる / Aい / Aな + ほど',
    ],
    explanation:
      'Diễn tả hai sự tiến triển song song: một hành động hoặc trạng thái lặp lại dẫn đến sự thay đổi tương ứng ở hành động hoặc trạng thái khác. Mệnh đề điều kiện đôi khi có thể được lược bỏ mà không ảnh hưởng đến nghĩa.',
    examples: [
      { ja: '休みの日は多ければ多いほど嬉しい。', vi: 'Ngày nghỉ càng nhiều càng sướng.' },
      { ja: '食べれば食べるほど、太っていきます。', vi: 'Càng ăn càng béo.' },
      { ja: '日本語は話せば話すほど上手になります。', vi: 'Tiếng Nhật càng nói nhiều thì càng nhanh giỏi.' },
      { ja: '考えれば考えるほど、わからなくなる。', vi: 'Càng suy nghĩ thì càng thấy không hiểu.' },
      { ja: 'この曲は、聞けば聞くほど好きになる。', vi: 'Bản nhạc này càng nghe càng thấy thích.' },
      { ja: '仕事は楽なら楽なほどいいです。', vi: 'Công việc càng nhàn càng tốt.' },
      { ja: 'すしは魚が新鮮なら新鮮なほどおいしいです。', vi: 'Sushi có cá càng tươi thì càng ngon.' },
      { ja: '山は登れば登るほど、気温が低くなる。', vi: 'Núi leo lên càng cao thì nhiệt độ càng thấp.' },
      { ja: '年を取れば取るほど、体の大切さが分かります。', vi: 'Càng lớn tuổi càng hiểu được tầm quan trọng của sức khỏe.' },
      { ja: 'この本は読めば読むほど面白くなる。', vi: 'Quyển sách này càng đọc càng thấy hay.' },
      { ja: '病気の治療は早ければ早いほどいい。', vi: 'Điều trị bệnh thì nên càng sớm càng tốt.' },
      { ja: '伝統的なものは、古いほど価値がある。', vi: 'Những đồ truyền thống càng lâu đời càng có giá trị.' },
    ],
  },
  {
    id: 'g006',
    title: '～ついでに',
    meaning: 'Nhân tiện… / Tiện thể… / Sẵn tiện… / Nhân lúc…',
    structure: [
      'N + の + ついでに',
      'Vる + ついでに',
      'Vた + ついでに',
    ],
    explanation:
      'Diễn tả ý nghĩa thực hiện thêm một hành động nhân khi thực hiện hành vi dự định lúc ban đầu. Hành động đứng trước ついでに là hành vi chính, có ý định từ trước. Hành động đứng sau ついでに là hành vi kèm theo, tiện thì làm.',
    examples: [
      { ja: '散歩のついでに、この手紙を出してきてくれませんか。', vi: 'Tiện thể đi dạo thì gửi luôn hộ tôi bức thư này nhé.' },
      { ja: '郵便局へ行ったついでに、はがきを買ってきた。', vi: 'Nhân tiện đến bưu điện tôi đã mua 1 tấm bưu thiếp.' },
      { ja: '出かけるついでに、ごみを捨てます。', vi: 'Tiện đi ngoài tôi sẽ vứt rác luôn.' },
      { ja: '出張で大阪に行くついでに神戸まで足を伸ばそうかなあ。', vi: 'Tiện đi công tác ở Osaka thì có khi ghé thăm Kobe luôn nhỉ.' },
      { ja: '図書館へ本を借りに行った。ついでに、近くに住んでいる友達のところへ行ってみた。', vi: 'Tôi đã tới thư viện mượn sách. Tiện thể thử ghé qua chỗ của người bạn sống gần đó.' },
      { ja: '京都へ行くついでに、奈良を回ってみたい。', vi: 'Nhân tiện đi Kyoto tôi muốn thử vòng qua Nara.' },
      { ja: '買い物のついでに、図書館へ行って本を借りて来た。', vi: 'Nhân tiện đi mua sắm tôi đã tới thư viện mượn sách.' },
      { ja: '仕事で京都に行ったついでに、高校時代の友人に会ってきた。', vi: 'Sẵn tiện đến Kyoto để làm việc, tôi đã gặp người bạn hồi cấp 3.' },
      { ja: '洗濯機を直すついでに、ドアの取っ手も直してもらった。', vi: 'Nhân tiện sửa máy giặt tôi đã nhờ sửa lại tay nắm cửa.' },
    ],
  },
  {
    id: 'g007',
    title: '～ほど／ほどだ',
    meaning: 'Đến mức… / Đến độ…',
    structure: [
      'N + ほど／ほどだ',
      'V（普通形）+ ほど／ほどだ',
      'いA + ほど／ほどだ',
      'なA + なほど／ほどだ',
    ],
    explanation:
      'Biểu thị nhấn mạnh mức độ của một trạng thái, hành động bằng cách nói ví von hay nêu ví dụ cụ thể. Khi ほど đi sau これ／それ／あれ thì có nghĩa tương ứng こんなに／そんなに／あんなに. Cách nói ～かとおもうほど cũng rất hay được sử dụng.',
    examples: [
      { ja: '歯を抜いたときは、死ぬほど痛かった。', vi: 'Lúc nhổ răng tôi đau gần chết.' },
      { ja: '泣きたいほど宿題が多い。', vi: 'Bài tập nhiều đến mức muốn khóc.' },
      { ja: '昨日は、声がかれるほど歌った。', vi: 'Hôm qua tôi đã hát đến cháy cả họng.' },
      { ja: '昨日はお腹いっぱいで、動けなくなるほど食べました。', vi: 'Hôm qua tôi đã ăn no đến mức không thể đi nổi.' },
      { ja: '値段を見て、目が飛び出るほど驚いた。', vi: 'Khi nhìn thấy giá thì ngạc nhiên đến mức trố mắt ra.' },
      { ja: '飽きるほどたくさん食べた。', vi: 'Tôi đã ăn nhiều đến phát ngán.' },
      { ja: '今年に入って、売り上げが驚くほど伸びた。', vi: 'Bắt đầu vào năm nay doanh thu tăng đến mức kinh ngạc.' },
      { ja: '昨日は山登りに行って、もう一歩も歩けないほど疲れました。', vi: 'Hôm qua leo núi mệt đến mức không đi nổi bước nào nữa.' },
      { ja: '試験に受かった時は、涙が出るほど嬉しかった。', vi: 'Khi vượt qua kỳ thi vui mừng đến mức rơi nước mắt.' },
      { ja: '今日は昨日ほど寒くない。', vi: 'Hôm nay không lạnh đến độ như hôm qua.' },
      { ja: 'あの人ほど日本語が上手に話せたらいいのになぁ。', vi: 'Muốn nói tiếng Nhật tốt như người kia.' },
    ],
  },
  {
    id: 'g008',
    title: '～ほど～はない',
    meaning: 'Không có gì... bằng...',
    structure: [
      'N + ほど + ～はない',
      'Vる + ほど + ～はない',
    ],
    explanation:
      'Diễn tả một thứ là nhất, không có gì sánh được. Dùng để so sánh bậc nhất một cách gián tiếp.',
    examples: [
      { ja: '健康ほど大切なものはない。', vi: 'Không có gì quý bằng sức khỏe.' },
      { ja: '旅行ほど楽しいことはない。', vi: 'Không có gì vui bằng đi du lịch.' },
      { ja: '母の料理ほどおいしいものはない。', vi: 'Không có gì ngon bằng cơm mẹ nấu.' },
    ],
  },
  {
    id: 'g009',
    title: '～たとたん（に）',
    meaning: 'Vừa mới…thì… / Ngay khi…thì…',
    structure: [
      'Vた + とたん（に）',
    ],
    explanation:
      'Diễn tả ngay sau một hành động hoặc thay đổi nào đó xảy ra thì có sự việc bất ngờ diễn ra ngay sau đó (thường là việc không lường trước, không chủ đích). Đi kèm với động từ thể hiện sự thay đổi hoặc hành động xảy ra trong thời gian ngắn. Phía sau たとたん là nội dung mang tính bất ngờ.',
    examples: [
      { ja: '窓を開けたとたん、強い風が入ってきた。', vi: 'Vừa mới mở cửa sổ ra thì có một luồng gió mạnh tràn vào.' },
      { ja: 'お酒を飲んだとたん、顔が赤くなった。', vi: 'Vừa mới uống rượu là mặt đã đỏ ngay lập tức.' },
      { ja: '立ち上がったとたんに、目まいがした。', vi: 'Vừa đứng lên thì bị chóng mặt.' },
      { ja: '疲れていたので、ベッドに入ったとたんに、眠ってしまった。', vi: 'Vì đang mệt nên vừa nằm xuống giường là đã ngủ ngay.' },
      { ja: 'ドアを開けたとたん、猫が飛び込んできた。', vi: 'Vừa mở cửa thì con mèo nhảy vào.' },
      { ja: '私は「じゃね」と言ったとたん、彼女は泣き出した。', vi: 'Khi tôi vừa dứt câu "tạm biệt" thì cô ấy bật khóc.' },
      { ja: '有名になったとたんに、彼は横柄な態度をとるようになった。', vi: 'Anh ta đã có thái độ kiêu căng ngay sau khi nổi tiếng.' },
      { ja: '出かけようと思って、家を出たとたんに、雨が降ってきた。', vi: 'Tôi vừa ra khỏi nhà định đi ra ngoài thì trời đổ mưa xuống.' },
      { ja: '試験終了のベルが鳴ったとたんに、教室が騒がしくなった。', vi: 'Ngay sau khi chuông báo hết giờ thi vang lên thì phòng học ồn ào hẳn lên.' },
      { ja: '注射をしたとたん、患者の痙攣は治まった。', vi: 'Ngay sau khi chích thuốc, chứng co giật của bệnh nhân đã dịu đi.' },
    ],
  },
  {
    id: 'g010',
    title: '～最中に（さいちゅうに）',
    meaning: 'Đang lúc / Ngay giữa lúc',
    structure: [
      'Vている + 最中に',
      'N + の + 最中に',
    ],
    explanation:
      'Diễn tả đúng lúc đang làm việc gì đó thì có sự việc khác xảy ra, thường là bất ngờ hoặc không mong muốn.',
    examples: [
      { ja: '会議の最中に、電話が鳴った。', vi: 'Đang giữa lúc họp, điện thoại reo.' },
      { ja: '食事の最中に、地震が起きた。', vi: 'Đang ăn cơm thì xảy ra động đất.' },
      { ja: '授業の最中に、居眠りしてしまった。', vi: 'Đang giờ học thì ngủ gật mất.' },
    ],
  },
  {
    id: 'g011',
    title: '～に対して／に対する',
    meaning: 'Đối với… / Ngược lại, trái lại… / Cho mỗi…',
    structure: [
      'N + に対して',
      'N1 + に対する + N2',
    ],
    explanation:
      'Cách dùng 1: Diễn tả đối tượng được tác động hoặc hướng về của hành vi, thái độ, tình cảm. Cách dùng 2: Diễn tả sự đối lập hoặc tương phản giữa hai đối tượng. Cách dùng 3: Đi với số lượng để chỉ tỷ lệ hay phân phối theo từng đơn vị.',
    examples: [
      { ja: '目上の人に対して、敬語を使うようにしている。', vi: 'Tôi cố gắng dùng kính ngữ với người bề trên.' },
      { ja: 'お客様に対して、失礼なことを言ってはいけません。', vi: 'Đối với khách hàng thì không được nói những lời thất lễ.' },
      { ja: '彼は誰に対しても親切でやさしい。', vi: 'Anh ta đối với ai cũng tốt bụng.' },
      { ja: '子どもに対する親の愛情は計り知れない。', vi: 'Tình yêu của cha mẹ dành cho con cái thật vô bờ bến.' },
      { ja: '被害者に対する補償問題を検討する。', vi: 'Chúng tôi xem xét vấn đề bồi thường cho những người bị hại.' },
      { ja: '兄が背が高いのに対して、弟のほうはクラスで一番低い。', vi: 'Người anh cao ráo, ngược lại người em lùn nhất lớp.' },
      { ja: 'この映画は海外では人気があるのに対して、日本国内ではそうでもない。', vi: 'Bộ phim nổi tiếng ở nước ngoài nhưng ở Nhật thì không hẳn.' },
      { ja: '近所のスーパーは夜11時閉店なのに対し、コンビニは24時間営業だ。', vi: 'Siêu thị gần đây mở đến 11 giờ tối nhưng konbini mở 24 giờ.' },
      { ja: '研究員一人に対して年間40万円の補助金が与えられる。', vi: 'Cấp trợ cấp 400 nghìn yên một năm cho mỗi nhân viên nghiên cứu.' },
      { ja: '学生20人に対して教員一人が配置されている。', vi: 'Bố trí một giáo viên cho mỗi 20 học sinh.' },
    ],
  },
  {
    id: 'g012',
    title: '～ため／ために／ためだ',
    meaning: 'Vì, Bởi, Do… (nguyên nhân) / Để… (mục đích)',
    structure: [
      '[Thể thường] ＋ ため／ために／ためだ',
      '[Tính từ-na な / Danh từ の] ＋ ため／ために／ためだ',
    ],
    explanation:
      'Có ý nghĩa giống với 「ので/から」nhưng mang sắc thái trang trọng hơn, thường xuất hiện trong văn viết, hội thoại lịch sự, hoặc các thông báo chính thức. Khi chỉ mục đích dùng Vる＋ために, khi chỉ nguyên nhân thường dùng Vた＋ために.',
    examples: [
      { ja: '雪が降ったため（に）、電車が遅れた。', vi: 'Vì tuyết rơi nên tàu điện bị trễ.' },
      { ja: '会議が延期されたのは、社長の体調が悪いためだ。', vi: 'Cuộc họp bị hoãn là do sức khỏe của giám đốc không tốt.' },
      { ja: 'ただ今、品川駅で人身事故が起こったため、電車が止まっております。', vi: 'Hiện tại, do xảy ra tai nạn tại ga Shinagawa nên tàu đã dừng hoạt động.' },
      { ja: '数学の点数が悪かったために、合格できなかった。', vi: 'Do điểm toán kém nên đã không đỗ.' },
      { ja: '事故があった。そのため（に）、遅れている。', vi: 'Đã xảy ra tai nạn. Vì thế nên bị trễ.' },
      { ja: '雨のために、ハイキングは中止になりました。', vi: 'Do mưa nên chuyến đi dã ngoại đã bị hủy.' },
      { ja: '外国人観光客が増えたため、外国語のパンフレットを作ることになった。', vi: 'Vì khách du lịch nước ngoài tăng nên đã quyết định làm tờ rơi bằng tiếng nước ngoài.' },
      { ja: '日本語を勉強するために、日本に来ました。', vi: 'Để học tiếng Nhật, tôi đến Nhật.' },
      { ja: '家族のために、毎日働いています。', vi: 'Vì gia đình, tôi làm việc mỗi ngày.' },
      { ja: '試験に合格するために、毎日勉強しています。', vi: 'Để đỗ kỳ thi, tôi học mỗi ngày.' },
      { ja: '留学するつもりだ。そのためにバイトして、お金をためている。', vi: 'Tôi định đi du học. Vì thế nên tôi đi làm thêm và tích góp tiền.' },
    ],
  },
  {
    id: 'g013',
    title: '～おかげで／おかげだ／おかげか',
    meaning: 'Nhờ vào…mà… / Nhờ có… mà…',
    structure: [
      'Động từ thể thường ＋ おかげで／おかげだ／おかげか',
      'Danh từ ＋ の ＋ おかげで／おかげだ／おかげか',
      'Tính từ đuôi -na ＋ な ＋ おかげで',
      'Tính từ đuôi い ＋ おかげで',
    ],
    explanation:
      'Diễn tả lòng biết ơn khi đạt được kết quả tốt đẹp nhờ vào ai hoặc điều gì đó. Trái nghĩa với せいで dùng cho kết quả tiêu cực. おかげだ đặt cuối câu, thường dùng với cấu trúc ～のは～おかげだ. おかげか biểu thị sự không chắc chắn. おかげさまで là thành ngữ mang nghĩa "nhờ trời".',
    examples: [
      { ja: '奨学金をもらったおかげで、留学できた。', vi: 'Nhờ nhận được học bổng mà tôi có thể đi du học.' },
      { ja: '病気が治ったのは、この薬のおかげだ。', vi: 'Bệnh khỏi là nhờ loại thuốc này.' },
      { ja: '先生のおかげで、僕の日本語は少しずつ上手になった。', vi: 'Nhờ có thầy mà tiếng Nhật của tôi dần dần giỏi lên.' },
      { ja: '日本に来たおかげで、日本語が上手になりました。', vi: 'Nhờ đến Nhật mà tiếng Nhật của tôi đã giỏi lên.' },
      { ja: 'あなたが手伝ってくれたおかげで、仕事が早く済みました。', vi: 'Nhờ bạn giúp đỡ mà công việc xong sớm. Cảm ơn.' },
      { ja: '両親のおかげで日本へ留学することができた。', vi: 'Nhờ bố mẹ mà tôi có thể đi du học Nhật Bản.' },
      { ja: '夫が家事を手伝ってくれるおかげで私も仕事を続けられるのです。', vi: 'Nhờ chồng giúp việc nhà mà tôi cũng có thể tiếp tục đi làm.' },
      { ja: '留学生活が寂しくないのは、みなさんが親切なおかげです。', vi: 'Cuộc sống du học không cô đơn là nhờ mọi người tốt bụng.' },
      { ja: '夜の道路工事が終わったおかげか、昨夜はいつもよりよく寝られた。', vi: 'Có lẽ nhờ công trình đường ban đêm đã xong mà tối qua tôi ngủ ngon hơn.' },
      { ja: 'おかげさまで、息子も志望校に無事合格できました。', vi: 'Nhờ trời, con trai tôi cũng đã đỗ vào trường mong muốn.' },
    ],
  },
  {
    id: 'g014',
    title: '～せいで／せいだ／せいか／せいにする',
    meaning: 'Do… / Vì… / Tại… / Đổ lỗi cho…',
    structure: [
      '[Động từ / tính từ thể thường] ＋ せいで／せいだ／せいか',
      'Tính từ đuôi -na ＋ な / Danh từ ＋ の ＋ せいで',
      '～のは ～ せいだ',
      '～のせいにする',
    ],
    explanation:
      'Chỉ nguyên nhân, lý do với sắc thái nhấn mạnh kết quả tiêu cực. せいで/せいだ: do, vì, bởi, tại (kết quả xấu). せいか: có lẽ do... (không chắc chắn về nguyên nhân). ～のは～せいだ: lý do mà... là do.... ～のせいにする: đổ lỗi, quy trách nhiệm cho ai.',
    examples: [
      { ja: 'バスが遅れたせいで、約束の時間に間に合わなかった。', vi: 'Do xe buýt trễ nên đã không kịp giờ hẹn.' },
      { ja: '寝不足のせいで、今日は頭がぼんやりしている。', vi: 'Do thiếu ngủ nên hôm nay đầu óc cứ mơ hồ.' },
      { ja: '朝寝坊したせいで、学校に遅れました。', vi: 'Do ngủ nướng nên đã đi học trễ.' },
      { ja: '林さんが急に休んだせいで、今日は3時間も残業しなければならない。', vi: 'Tại anh Hayashi đột ngột nghỉ nên hôm nay phải tăng ca tận 3 tiếng.' },
      { ja: '台風のせいで、旅行にいけなかったんです。', vi: 'Tại bão nên đã không đi du lịch được.' },
      { ja: '私が失敗したのは彼のせいだ。', vi: 'Tôi thất bại là tại anh ta.' },
      { ja: '目が悪くなったのはテレビを見すぎたせいだ。', vi: 'Mắt kém đi là do xem tivi quá nhiều.' },
      { ja: '神経を使ったせいか、胃が痛いです。', vi: 'Có lẽ do căng thẳng nên đau dạ dày.' },
      { ja: '暑いせいか、食欲がない。', vi: 'Có lẽ do nóng nên không có cảm giác thèm ăn.' },
      { ja: '彼は自分の失敗を人のせいにする。', vi: 'Anh ta đổ lỗi thất bại của mình cho người khác.' },
      { ja: '弱い人ほど、自分のミスを他人のせいにする。', vi: 'Người càng yếu đuối thì càng đổ lỗi cho người khác.' },
    ],
  },
  {
    id: 'g015',
    title: '～てほしい',
    meaning: 'Muốn ai đó làm gì…',
    structure: [
      'Nに ＋ Vて ＋ ほしい',
      'Nに ＋ Vて ＋ ほしくない',
      'Nに ＋ Vないで ＋ ほしい',
    ],
    explanation:
      'Biểu thị ý nghĩa mong muốn ai đó làm hoặc không làm điều gì đó cho mình. Hình thức phủ định có hai dạng: Vないでほしい và Vてほしくない. Cũng dùng để diễn đạt mong muốn một trạng thái xảy ra (NがVてほしい dùng với vật vô tri). Cấu trúc này giống với ～てもらいたい／ていただきたい.',
    examples: [
      { ja: '父にたばこをやめてほしいです。', vi: 'Tôi muốn bố bỏ thuốc lá.' },
      { ja: '彼女に日本語の勉強を続けてほしいです。', vi: 'Tôi muốn cô ấy tiếp tục học tiếng Nhật.' },
      { ja: '前の彼氏にしあわせになってほしい。', vi: 'Tôi muốn người yêu cũ được hạnh phúc.' },
      { ja: '彼は、多くの人に着物の良さを知ってほしいと言っている。', vi: 'Anh ấy nói rằng muốn nhiều người biết đến sự tuyệt vời của kimono.' },
      { ja: 'このことはほかの人には言わないでほしいのです。', vi: 'Việc này thì tôi mong anh đừng nói cho ai biết.' },
      { ja: '子どもには漫画ばかり読むような大人になってほしくない。', vi: 'Tôi không muốn con mình trở thành người lớn chỉ đọc toàn truyện tranh.' },
      { ja: 'すみませんが、ここでタバコを吸わないでほしいんですが。', vi: 'Xin lỗi nhưng xin anh đừng hút thuốc ở đây.' },
      { ja: '世界が平和になってほしい。', vi: 'Tôi mong cho thế giới được hòa bình.' },
      { ja: 'もっと雨が降ってほしい。農民は水不足で困っているから。', vi: 'Tôi mong trời sẽ mưa nhiều hơn. Vì nông dân khổ sở vì thiếu nước.' },
      { ja: 'しかしながら、この件はわたしに処理を任せてほしい。', vi: 'Tuy nhiên việc này thì tôi muốn anh giao cho tôi xử lý.' },
    ],
  },
  {
    id: 'g016',
    title: '～べき／べきだ／べきではない',
    meaning: 'Nên… / Cần… / Phải làm việc gì',
    structure: [
      '[Động từ thể từ điển] ＋ べき／べきだ／べきではない',
      '[Tính từ -na] ＋ であるべき',
      'する → すべきだ / すべきではない',
    ],
    explanation:
      'Diễn đạt ý nghĩa nên, cần, phải làm một việc gì đó, hoặc không nên, không được làm việc gì đó. Được dùng để cảnh cáo, khuyến nghị, cấm đoán. Không dùng với luật pháp, quy định, cũng không dùng trực tiếp với bề trên.',
    examples: [
      { ja: '学生はもっと勉強すべきだ。', vi: 'Học sinh nên học nhiều hơn.' },
      { ja: '電車の中では、若者はお年寄りに席を譲るべきです。', vi: 'Ở trên tàu thì người trẻ tuổi nên nhường chỗ cho người già.' },
      { ja: 'そんな大声で話すべきではない。', vi: 'Không nên nói lớn tiếng như vậy.' },
      { ja: '無断で欠席すべきではない。', vi: 'Không nên tự ý vắng mặt mà không thông báo.' },
      { ja: '約束は守るべきだ。', vi: 'Nên giữ lời hứa.' },
      { ja: 'おもちゃはまず安全であるべきだ。', vi: 'Đồ chơi thì điều đầu tiên là cần phải an toàn.' },
      { ja: '他人の私生活に干渉すべきではない。', vi: 'Không nên can thiệp vào chuyện đời tư của người khác.' },
      { ja: '何をすべきか、もう彼女の心は決まっていた。', vi: 'Cô ấy đã quyết định những gì cô ấy nên làm.' },
      { ja: '人間は自分の行動に責任を持つべきだ。', vi: 'Con người thì cần chịu trách nhiệm cho những hành động của mình.' },
      { ja: '親が生きているうちにもっと親孝行するべきだった、と後悔している。', vi: 'Tôi vẫn hối hận là lẽ ra nên hiếu thảo với bố mẹ hơn khi bố mẹ còn sống.' },
    ],
  },
  {
    id: 'g017',
    title: '～かわりに／かわりの',
    meaning: 'Thay vì… / Thay cho… / Đổi lại… / Bù lại…',
    structure: [
      'N + の + かわりに／かわりの + N',
      'Vる + かわりに',
      'Vた + かわりに',
      'いA + かわりに',
      'なA + な + かわりに',
    ],
    explanation:
      'Cách dùng 1: Thể hiện sự thay thế cho một người hay vật nào đó. Cách dùng 2: Diễn tả tuy có điều tốt nhưng bù lại cũng có điều không tốt, hoặc ngược lại. Thể hiện mặt tích cực và tiêu cực của vấn đề. Có thể dùng dạng kanji 代わりに.',
    examples: [
      { ja: '最近、時計のかわりに携帯電話を使う人が増えた。', vi: 'Gần đây số người dùng điện thoại thay cho đồng hồ đã tăng lên.' },
      { ja: '山下さんの代わりに、山田さんがA社の会議に出ます。', vi: 'Anh Yamada sẽ đi họp ở công ty A thay cho anh Yamashita.' },
      { ja: '引っ越しを手伝うかわりに、宿題を手伝ってよ。', vi: 'Đổi lại việc tớ giúp cậu chuyển nhà, hãy giúp tớ làm bài tập đi.' },
      { ja: '正月は海外旅行に行く代わりに、近くの温泉に行った。', vi: 'Thay vì đi du lịch nước ngoài vào dịp Tết, tôi đã đi onsen ở gần nhà.' },
      { ja: 'この仕事は安定しているかわりに、給料があまり高くない。', vi: 'Công việc này ổn định nhưng đổi lại lương không cao lắm.' },
      { ja: 'この辺は買い物などに不便な代わりに、自然が豊かで気持ちがいい。', vi: 'Khu vực này mua sắm bất tiện nhưng bù lại có nhiều thiên nhiên nên dễ chịu.' },
      { ja: 'ジェムさんに英語を教えてもらう代わりに、彼に日本語を教えてあげることにした。', vi: 'Tôi quyết định dạy James tiếng Nhật, đổi lại nhờ anh dạy tôi tiếng Anh.' },
      { ja: '映画を見に行く代わりに家でテレビを見る。', vi: 'Tôi sẽ xem tivi ở nhà thay vì đi xem phim ở ngoài.' },
      { ja: '手伝ってもらった代わりに晩御飯をおごらせてください。', vi: 'Xin hãy để tôi mời anh ăn tối để cảm ơn việc anh đã giúp đỡ.' },
    ],
  },
  {
    id: 'g018',
    title: '～について / につき',
    meaning: 'Về / Về vấn đề',
    structure: [
      'N + について / についての + N',
    ],
    explanation:
      'Diễn tả chủ đề, nội dung được đề cập đến. Thường dùng với các động từ như 話す, 考える, 調べる...',
    examples: [
      { ja: '日本の文化について調べています。', vi: 'Tôi đang tìm hiểu về văn hóa Nhật Bản.' },
      { ja: 'この問題について、みんなで話し合いましょう。', vi: 'Hãy cùng thảo luận về vấn đề này.' },
      { ja: '将来についてよく考えなさい。', vi: 'Hãy suy nghĩ kỹ về tương lai.' },
    ],
  },
  {
    id: 'g019',
    title: '～にとって',
    meaning: 'Đối với / Theo... thì',
    structure: [
      'N + にとって / にとっての + N',
    ],
    explanation:
      'Diễn tả lập trường, quan điểm của ai đó. Nhấn mạnh ý kiến chủ quan.',
    examples: [
      { ja: '私にとって、家族が一番大切です。', vi: 'Đối với tôi, gia đình là quan trọng nhất.' },
      { ja: '子供にとって、遊ぶことは大切だ。', vi: 'Đối với trẻ em, chơi là quan trọng.' },
      { ja: '外国人にとって、漢字は難しい。', vi: 'Đối với người nước ngoài, Hán tự rất khó.' },
    ],
  },
  {
    id: 'g020',
    title: '～として / としても',
    meaning: 'Với tư cách là / Xét theo vai trò',
    structure: [
      'N + として / としても / としての + N',
    ],
    explanation:
      'Diễn tả tư cách, vai trò, vị trí của ai đó. としても = ngay cả với tư cách là...',
    examples: [
      { ja: '留学生として日本に来ました。', vi: 'Tôi đến Nhật với tư cách du học sinh.' },
      { ja: '彼は医者としても有名だ。', vi: 'Anh ấy cũng nổi tiếng với tư cách là bác sĩ.' },
      { ja: 'この町は観光地として人気がある。', vi: 'Thị trấn này nổi tiếng với tư cách là điểm du lịch.' },
    ],
  },
  {
    id: 'g021',
    title: '～ことにする',
    meaning: 'Quyết định làm gì',
    structure: [
      'Vる / Vない + ことにする',
    ],
    explanation:
      'Diễn tả quyết định do bản thân tự đưa ra. ないことにする = quyết định không làm.',
    examples: [
      { ja: '来月から毎日運動することにした。', vi: 'Tôi quyết định từ tháng sau sẽ tập thể dục mỗi ngày.' },
      { ja: 'お酒を飲まないことにした。', vi: 'Tôi quyết định không uống rượu nữa.' },
      { ja: '夏休みに日本に行くことにしました。', vi: 'Tôi quyết định đi Nhật vào kỳ nghỉ hè.' },
    ],
  },
  {
    id: 'g022',
    title: '～ことになる',
    meaning: 'Sẽ / Được quyết định / Nghĩa là',
    structure: [
      'Vる / Vない + ことになる',
    ],
    explanation:
      'Diễn tả quyết định do ai đó hoặc tổ chức đưa ra (không phải bản thân). Cũng diễn tả kết quả tự nhiên.',
    examples: [
      { ja: '来月、大阪に転勤することになりました。', vi: 'Tháng sau tôi sẽ chuyển công tác đến Osaka.' },
      { ja: '会議は中止になることになった。', vi: 'Cuộc họp đã được quyết định hủy bỏ.' },
      { ja: '日本に留学することになりました。', vi: 'Tôi sẽ đi du học Nhật.' },
    ],
  },
  {
    id: 'g023',
    title: '～ようにする',
    meaning: 'Cố gắng / Tìm cách',
    structure: [
      'Vる / Vない + ようにする',
    ],
    explanation:
      'Diễn tả nỗ lực, cố gắng để đạt được hoặc duy trì một thói quen, trạng thái nào đó.',
    examples: [
      { ja: '毎日野菜を食べるようにしています。', vi: 'Tôi cố gắng ăn rau mỗi ngày.' },
      { ja: '遅刻しないようにしてください。', vi: 'Hãy cố gắng đừng đi muộn.' },
      { ja: '早く寝るようにしている。', vi: 'Tôi cố gắng đi ngủ sớm.' },
    ],
  },
  {
    id: 'g024',
    title: '～ようになる',
    meaning: 'Trở nên / Đến mức có thể',
    structure: [
      'Vる / Vない + ようになる',
    ],
    explanation:
      'Diễn tả sự thay đổi trạng thái, khả năng theo thời gian. Từ không thể sang có thể, hoặc ngược lại.',
    examples: [
      { ja: '日本語が話せるようになりました。', vi: 'Tôi đã có thể nói tiếng Nhật rồi.' },
      { ja: '子供が野菜を食べるようになった。', vi: 'Con trẻ đã chịu ăn rau rồi.' },
      { ja: '朝早く起きられるようになった。', vi: 'Tôi đã có thể dậy sớm rồi.' },
    ],
  },
  {
    id: 'g025',
    title: '～ようとする',
    meaning: 'Sắp / Định / Đang cố',
    structure: [
      'Vよう + とする',
    ],
    explanation:
      'Có 2 cách dùng: (1) Sắp/định làm gì (hành động sắp xảy ra). (2) Đang cố gắng làm gì đó nhưng chưa chắc thành công.',
    examples: [
      { ja: '家を出ようとしたとき、電話が鳴った。', vi: 'Đang định ra khỏi nhà thì điện thoại reo.' },
      { ja: 'ドアを開けようとしたが、開かなかった。', vi: 'Cố mở cửa nhưng không mở được.' },
      { ja: '赤ちゃんが立とうとしている。', vi: 'Em bé đang cố đứng lên.' },
    ],
  },
  {
    id: 'g026',
    title: '～わけにはいかない',
    meaning: 'Không thể / Không được phép',
    structure: [
      'Vる + わけにはいかない',
      'Vない + わけにはいかない',
    ],
    explanation:
      'Diễn tả vì lý do đạo đức, xã hội, tình huống mà không thể làm việc gì đó. Vないわけにはいかない = buộc phải làm.',
    examples: [
      { ja: '明日試験だから、遊ぶわけにはいかない。', vi: 'Mai thi nên không thể đi chơi.' },
      { ja: '秘密だから、教えるわけにはいかない。', vi: 'Vì là bí mật nên không thể nói.' },
      { ja: '約束したから、行かないわけにはいかない。', vi: 'Đã hứa rồi nên buộc phải đi.' },
    ],
  },
  {
    id: 'g027',
    title: '～わけだ',
    meaning: 'Thảo nào / Tức là / Thì ra là',
    structure: [
      'V / Aい / Aな / N + わけだ',
    ],
    explanation:
      'Diễn tả sự hiểu ra, kết luận logic sau khi biết được nguyên nhân. Mang sắc thái "à, thì ra là vậy".',
    examples: [
      { ja: '毎日練習しているから、上手なわけだ。', vi: 'Luyện tập mỗi ngày, thảo nào giỏi.' },
      { ja: '道理で暑いわけだ。エアコンが壊れている。', vi: 'Thảo nào nóng, máy lạnh hỏng rồi.' },
      { ja: '彼は日本に10年住んでいるから、日本語が上手なわけだ。', vi: 'Anh ấy sống ở Nhật 10 năm, thảo nào tiếng Nhật giỏi.' },
    ],
  },
  {
    id: 'g028',
    title: '～わけではない',
    meaning: 'Không hẳn là / Không có nghĩa là',
    structure: [
      'V / Aい / Aな / N + わけではない',
    ],
    explanation:
      'Phủ nhận một phần, không phải hoàn toàn đúng. Diễn tả rằng mọi thứ không hoàn toàn như người khác nghĩ.',
    examples: [
      { ja: '嫌いなわけではない。ただ忙しいだけだ。', vi: 'Không phải là ghét. Chỉ là bận thôi.' },
      { ja: '日本語が上手なわけではないが、少し話せる。', vi: 'Không hẳn giỏi tiếng Nhật nhưng nói được một ít.' },
      { ja: 'お金がないわけではないが、節約している。', vi: 'Không phải là không có tiền, nhưng đang tiết kiệm.' },
    ],
  },
  {
    id: 'g029',
    title: '～わけがない',
    meaning: 'Không có lý nào / Làm sao mà',
    structure: [
      'V / Aい / Aな / N + わけがない',
    ],
    explanation:
      'Phủ nhận hoàn toàn khả năng xảy ra. Mang sắc thái mạnh: chắc chắn không thể xảy ra.',
    examples: [
      { ja: 'そんなことがあるわけがない。', vi: 'Không có lý nào có chuyện đó.' },
      { ja: '一日で覚えられるわけがない。', vi: 'Làm sao mà nhớ hết trong một ngày.' },
      { ja: '彼が嘘をつくわけがない。', vi: 'Không có lý nào anh ấy nói dối.' },
    ],
  },
  {
    id: 'g030',
    title: '～はずだ / はずがない',
    meaning: 'Chắc là / Chắc chắn không',
    structure: [
      'V / Aい / Aな / N + はずだ',
      'V / Aい / Aな / N + はずがない',
    ],
    explanation:
      'はずだ: Suy đoán dựa trên cơ sở, lý do hợp lý. はずがない: Chắc chắn không thể xảy ra (có cơ sở).',
    examples: [
      { ja: '彼は来るはずだ。約束したから。', vi: 'Chắc anh ấy sẽ đến. Vì đã hứa rồi.' },
      { ja: 'まだ届くはずがない。昨日送ったばかりだ。', vi: 'Chắc chắn chưa đến. Hôm qua mới gửi.' },
      { ja: 'あの人が犯人のはずがない。', vi: 'Chắc chắn người đó không phải thủ phạm.' },
    ],
  },
  {
    id: 'g031',
    title: '～とは限らない',
    meaning: 'Không hẳn / Không nhất thiết',
    structure: [
      'V / Aい / Aな / N + とは限らない',
    ],
    explanation:
      'Diễn tả điều gì đó không phải lúc nào cũng đúng, có ngoại lệ.',
    examples: [
      { ja: '高いものがいいとは限らない。', vi: 'Đồ đắt không hẳn là tốt.' },
      { ja: '若いから元気だとは限らない。', vi: 'Trẻ không hẳn là khỏe.' },
      { ja: '有名な店がおいしいとは限らない。', vi: 'Quán nổi tiếng không hẳn ngon.' },
    ],
  },
  {
    id: 'g032',
    title: '～ことがある',
    meaning: 'Có lúc / Thỉnh thoảng',
    structure: [
      'Vる + ことがある',
    ],
    explanation:
      'Diễn tả sự việc thỉnh thoảng xảy ra, không thường xuyên.',
    examples: [
      { ja: '朝ごはんを食べないことがある。', vi: 'Có lúc tôi không ăn sáng.' },
      { ja: '電車に乗り遅れることがある。', vi: 'Thỉnh thoảng tôi bị lỡ tàu.' },
      { ja: '日曜日に会社に行くことがある。', vi: 'Có khi chủ nhật tôi cũng đi làm.' },
    ],
  },
  {
    id: 'g033',
    title: '～ことにしている',
    meaning: 'Luôn / Tập thói quen',
    structure: [
      'Vる / Vない + ことにしている',
    ],
    explanation:
      'Diễn tả thói quen do bản thân tự quyết định và đang duy trì.',
    examples: [
      { ja: '毎朝ジョギングすることにしている。', vi: 'Tôi luôn chạy bộ mỗi sáng.' },
      { ja: '夜遅く食べないことにしている。', vi: 'Tôi không ăn khuya (tập thói quen).' },
      { ja: '毎日日記を書くことにしている。', vi: 'Tôi luôn viết nhật ký mỗi ngày.' },
    ],
  },
  {
    id: 'g034',
    title: '～ことになっている',
    meaning: 'Đã được quyết định / Theo quy định',
    structure: [
      'Vる / Vない + ことになっている',
    ],
    explanation:
      'Diễn tả quy tắc, lịch trình, thỏa thuận đã được đặt ra từ trước.',
    examples: [
      { ja: 'この学校では制服を着ることになっている。', vi: 'Ở trường này quy định phải mặc đồng phục.' },
      { ja: '来月結婚することになっている。', vi: 'Tháng sau tôi sẽ kết hôn (đã quyết định).' },
      { ja: '部屋でタバコを吸わないことになっている。', vi: 'Theo quy định không được hút thuốc trong phòng.' },
    ],
  },
  {
    id: 'g035',
    title: '～ようにする',
    meaning: 'Cố gắng / Tìm cách',
    structure: [
      'Vる / Vない + ようにする',
    ],
    explanation:
      'Diễn tả nỗ lực, cố gắng thay đổi thói quen hoặc hành vi.',
    examples: [
      { ja: '甘いものを食べないようにする。', vi: 'Cố gắng không ăn đồ ngọt.' },
      { ja: '毎日少しでも運動するようにしています。', vi: 'Tôi cố gắng mỗi ngày tập thể dục một ít.' },
    ],
  },
  {
    id: 'g036',
    title: '～ように言う',
    meaning: 'Bảo ai đó làm gì / Nhờ, yêu cầu',
    structure: [
      'Vる / Vない + ように言う',
    ],
    explanation:
      'Diễn tả việc truyền đạt yêu cầu, nhờ vả hoặc mệnh lệnh cho người khác.',
    examples: [
      { ja: '医者に運動するように言われた。', vi: 'Bác sĩ bảo tôi tập thể dục.' },
      { ja: '先生は学生に遅刻しないように言った。', vi: 'Thầy giáo bảo học sinh đừng đi muộn.' },
      { ja: '母に早く帰るように言われた。', vi: 'Mẹ bảo tôi về sớm.' },
    ],
  },
  {
    id: 'g037',
    title: '～ばかり',
    meaning: 'Chỉ / Toàn là / Suốt / Vừa mới',
    structure: [
      'Vて + ばかりいる',
      'Vた + ばかり',
      'N + ばかり',
    ],
    explanation:
      'Có nhiều cách dùng: (1) Vてばかりいる: Suốt ngày chỉ làm gì (phàn nàn). (2) Vたばかり: Vừa mới. (3) Nばかり: Toàn là, chỉ có.',
    examples: [
      { ja: '彼はゲームをしてばかりいる。', vi: 'Anh ấy suốt ngày chỉ chơi game.' },
      { ja: '日本に来たばかりです。', vi: 'Tôi vừa mới đến Nhật.' },
      { ja: '肉ばかり食べないでください。', vi: 'Đừng chỉ ăn toàn thịt.' },
    ],
  },
  {
    id: 'g038',
    title: '～ばかりでなく',
    meaning: 'Không chỉ... mà còn...',
    structure: [
      'V / Aい / Aな / N + ばかりでなく',
    ],
    explanation:
      'Diễn tả ngoài điều đã nêu ra còn có thêm điều khác nữa. Tương tự だけでなく.',
    examples: [
      { ja: '彼は英語ばかりでなく、中国語も話せる。', vi: 'Anh ấy không chỉ nói tiếng Anh mà còn nói được tiếng Trung.' },
      { ja: '成績がいいばかりでなく、スポーツも得意だ。', vi: 'Không chỉ học giỏi mà còn giỏi thể thao.' },
    ],
  },
  {
    id: 'g039',
    title: '～とおり（に）',
    meaning: 'Đúng như / Theo đúng',
    structure: [
      'Vる / Vた + とおり（に）',
      'N + の + とおり（に）',
    ],
    explanation:
      'Diễn tả làm đúng theo cách đã nêu ra, không thay đổi.',
    examples: [
      { ja: '先生が言ったとおりにしてください。', vi: 'Hãy làm đúng như thầy nói.' },
      { ja: '説明書のとおりに組み立てた。', vi: 'Lắp ráp đúng theo hướng dẫn.' },
      { ja: '思ったとおりだった。', vi: 'Đúng như tôi nghĩ.' },
    ],
  },
  {
    id: 'g040',
    title: '～ところだ',
    meaning: 'Sắp / Đang / Vừa mới',
    structure: [
      'Vる + ところだ (sắp)',
      'Vている + ところだ (đang)',
      'Vた + ところだ (vừa mới)',
    ],
    explanation:
      'Diễn tả thời điểm của hành động: Vるところ = sắp, Vているところ = đang, Vたところ = vừa xong.',
    examples: [
      { ja: '今から出かけるところです。', vi: 'Tôi sắp đi ra ngoài.' },
      { ja: '今ご飯を食べているところです。', vi: 'Tôi đang ăn cơm.' },
      { ja: 'ちょうど終わったところです。', vi: 'Vừa mới xong.' },
    ],
  },
  {
    id: 'g041',
    title: '～ところに / ところへ',
    meaning: 'Đúng lúc / Trong lúc thì',
    structure: [
      'Vている / Vた + ところに / ところへ',
    ],
    explanation:
      'Diễn tả đúng vào thời điểm nào đó thì có sự việc khác xảy ra, thường bất ngờ.',
    examples: [
      { ja: '出かけようとしたところに、友達が来た。', vi: 'Đúng lúc sắp ra ngoài thì bạn đến.' },
      { ja: '寝ているところに電話が来た。', vi: 'Đang ngủ thì có điện thoại.' },
    ],
  },
  {
    id: 'g042',
    title: '～ようにする',
    meaning: 'Cố gắng / Tìm cách',
    structure: [
      'Vる / Vない + ようにする',
    ],
    explanation:
      'Diễn tả nỗ lực cố gắng thay đổi thói quen.',
    examples: [
      { ja: '毎日運動するようにしています。', vi: 'Tôi cố gắng tập thể dục mỗi ngày.' },
    ],
  },
  {
    id: 'g043',
    title: '～に違いない（にちがいない）',
    meaning: 'Chắc chắn / Hẳn là',
    structure: [
      'V / Aい / Aな / N + に違いない',
    ],
    explanation:
      'Diễn tả sự suy đoán với độ tin cậy cao, gần như chắc chắn dựa trên cơ sở.',
    examples: [
      { ja: '彼は知っているに違いない。', vi: 'Chắc chắn anh ấy biết.' },
      { ja: 'この料理はおいしいに違いない。', vi: 'Món ăn này chắc chắn ngon.' },
      { ja: '犯人はこの中にいるに違いない。', vi: 'Thủ phạm chắc chắn ở trong này.' },
    ],
  },
  {
    id: 'g044',
    title: '～らしい',
    meaning: 'Nghe nói / Hình như / Giống như',
    structure: [
      'V / Aい / Aな / N + らしい',
      'N + らしい N (có tính chất)',
    ],
    explanation:
      'Có 2 cách dùng: (1) Suy đoán dựa trên thông tin nghe được. (2) Mang tính chất đặc trưng: nam らしい = có nam tính.',
    examples: [
      { ja: '明日は雨が降るらしい。', vi: 'Nghe nói mai trời mưa.' },
      { ja: '彼は会社を辞めたらしい。', vi: 'Hình như anh ấy đã nghỉ việc.' },
      { ja: '彼女は女らしい人だ。', vi: 'Cô ấy là người rất nữ tính.' },
    ],
  },
  {
    id: 'g045',
    title: '～っぽい',
    meaning: 'Có vẻ / Hay / Dễ (tính chất)',
    structure: [
      'N / Vます + っぽい',
    ],
    explanation:
      'Diễn tả tính chất, xu hướng. Thường mang sắc thái tiêu cực.',
    examples: [
      { ja: '最近忘れっぽくなった。', vi: 'Gần đây hay quên.' },
      { ja: '彼は怒りっぽい。', vi: 'Anh ấy hay nóng giận.' },
      { ja: 'この服は安っぽい。', vi: 'Bộ quần áo này trông rẻ tiền.' },
    ],
  },
  {
    id: 'g046',
    title: '～がち',
    meaning: 'Hay / Thường hay (xu hướng xấu)',
    structure: [
      'Vます + がち',
      'N + がち',
    ],
    explanation:
      'Diễn tả xu hướng, thường xảy ra. Mang sắc thái tiêu cực.',
    examples: [
      { ja: '冬は風邪を引きがちだ。', vi: 'Mùa đông hay bị cảm.' },
      { ja: '彼は遅刻しがちだ。', vi: 'Anh ấy hay đi muộn.' },
      { ja: '曇りがちの天気だ。', vi: 'Thời tiết hay âm u.' },
    ],
  },
  {
    id: 'g047',
    title: '～だらけ',
    meaning: 'Toàn là / Đầy',
    structure: [
      'N + だらけ',
    ],
    explanation:
      'Diễn tả trạng thái đầy, toàn là cái gì đó. Mang sắc thái tiêu cực.',
    examples: [
      { ja: '部屋はゴミだらけだ。', vi: 'Phòng toàn rác.' },
      { ja: '作文は間違いだらけだった。', vi: 'Bài văn toàn lỗi.' },
      { ja: '手が泥だらけになった。', vi: 'Tay dính đầy bùn.' },
    ],
  },
  {
    id: 'g048',
    title: '～ぎみ',
    meaning: 'Có vẻ hơi / Hơi',
    structure: [
      'Vます + ぎみ',
      'N + ぎみ',
    ],
    explanation:
      'Diễn tả xu hướng nhẹ, dấu hiệu bắt đầu của một trạng thái. Thường tiêu cực.',
    examples: [
      { ja: '最近太りぎみだ。', vi: 'Gần đây có vẻ hơi mập.' },
      { ja: '風邪ぎみで体がだるい。', vi: 'Hơi bị cảm nên mệt.' },
      { ja: '仕事が遅れぎみだ。', vi: 'Công việc có vẻ hơi chậm.' },
    ],
  },
  {
    id: 'g049',
    title: '～まま',
    meaning: 'Vẫn / Cứ để nguyên / Như thế',
    structure: [
      'Vた + まま',
      'Vない + まま',
      'N + の + まま',
      'Aい + まま',
    ],
    explanation:
      'Diễn tả trạng thái được giữ nguyên không thay đổi.',
    examples: [
      { ja: '窓を開けたまま寝てしまった。', vi: 'Ngủ quên mà cửa sổ vẫn mở.' },
      { ja: '靴を履いたまま部屋に入った。', vi: 'Vẫn mang giày mà đi vào phòng.' },
      { ja: '子供のまま大人になりたくない。', vi: 'Muốn cứ là trẻ con, không muốn lớn.' },
    ],
  },
  {
    id: 'g050',
    title: '～っぱなし',
    meaning: 'Suốt / Cứ để nguyên (tiêu cực)',
    structure: [
      'Vます + っぱなし',
    ],
    explanation:
      'Diễn tả hành động hoặc trạng thái cứ giữ nguyên không ai xử lý. Mang sắc thái phàn nàn.',
    examples: [
      { ja: '電気をつけっぱなしにしないでください。', vi: 'Đừng cứ để đèn bật suốt.' },
      { ja: 'ドアを開けっぱなしにするな。', vi: 'Đừng để cửa mở hoài.' },
      { ja: '一日中立ちっぱなしで疲れた。', vi: 'Đứng suốt cả ngày nên mệt.' },
    ],
  },
  {
    id: 'g051',
    title: '～切る（きる）',
    meaning: 'Hết / Hoàn toàn / Hoàn tất',
    structure: [
      'Vます + 切る / 切れる / 切れない',
    ],
    explanation:
      'Diễn tả hành động được hoàn thành triệt để, hoàn toàn. 切れない = không thể hoàn thành hết.',
    examples: [
      { ja: 'マラソンを走り切った。', vi: 'Chạy hết marathon rồi.' },
      { ja: '食べ切れないほど料理が多い。', vi: 'Đồ ăn nhiều không ăn hết được.' },
      { ja: '疲れ切ってしまった。', vi: 'Mệt hoàn toàn rồi.' },
    ],
  },
  {
    id: 'g052',
    title: '～かける',
    meaning: 'Đang / Giữa chừng / Dở',
    structure: [
      'Vます + かける / かけの + N',
    ],
    explanation:
      'Diễn tả hành động đang dở dang, chưa hoàn thành, mới bắt đầu.',
    examples: [
      { ja: '読みかけの本がたくさんある。', vi: 'Có nhiều sách đang đọc dở.' },
      { ja: '食べかけのケーキを冷蔵庫に入れた。', vi: 'Cho cái bánh ăn dở vào tủ lạnh.' },
      { ja: '何か言いかけてやめた。', vi: 'Định nói gì đó rồi thôi.' },
    ],
  },
  {
    id: 'g053',
    title: '～出す（だす）',
    meaning: 'Bắt đầu (đột nhiên)',
    structure: [
      'Vます + 出す',
    ],
    explanation:
      'Diễn tả hành động bắt đầu đột ngột, bất ngờ.',
    examples: [
      { ja: '急に雨が降り出した。', vi: 'Trời đột nhiên mưa.' },
      { ja: '赤ちゃんが泣き出した。', vi: 'Em bé bỗng khóc.' },
      { ja: '彼女は急に笑い出した。', vi: 'Cô ấy bỗng phá ra cười.' },
    ],
  },
  {
    id: 'g054',
    title: '～続ける（つづける）',
    meaning: 'Tiếp tục / Liên tục',
    structure: [
      'Vます + 続ける',
    ],
    explanation:
      'Diễn tả hành động được tiếp tục, duy trì liên tục không ngừng.',
    examples: [
      { ja: '3時間走り続けた。', vi: 'Chạy liên tục 3 tiếng.' },
      { ja: '彼は夢を追い続けている。', vi: 'Anh ấy tiếp tục theo đuổi ước mơ.' },
      { ja: '雨が降り続けている。', vi: 'Mưa tiếp tục rơi.' },
    ],
  },
  {
    id: 'g055',
    title: '～始める（はじめる）',
    meaning: 'Bắt đầu',
    structure: [
      'Vます + 始める',
    ],
    explanation:
      'Diễn tả hành động bắt đầu (có kế hoạch, tự nhiên).',
    examples: [
      { ja: '桜が咲き始めた。', vi: 'Hoa anh đào bắt đầu nở.' },
      { ja: '日本語を勉強し始めた。', vi: 'Bắt đầu học tiếng Nhật.' },
      { ja: '雪が降り始めた。', vi: 'Tuyết bắt đầu rơi.' },
    ],
  },
  {
    id: 'g056',
    title: '～終わる（おわる）',
    meaning: 'Kết thúc / Xong',
    structure: [
      'Vます + 終わる',
    ],
    explanation:
      'Diễn tả hành động đã hoàn thành, kết thúc.',
    examples: [
      { ja: '本を読み終わった。', vi: 'Đọc xong sách rồi.' },
      { ja: '宿題を書き終わりました。', vi: 'Viết xong bài tập rồi.' },
      { ja: '食べ終わったら片付けてください。', vi: 'Ăn xong thì dọn dẹp đi.' },
    ],
  },
  {
    id: 'g057',
    title: '～づらい',
    meaning: 'Khó (do chủ quan)',
    structure: [
      'Vます + づらい',
    ],
    explanation:
      'Diễn tả việc gì đó khó thực hiện do cảm xúc, tâm lý hoặc thể chất. Khác にくい (khó do khách quan).',
    examples: [
      { ja: 'このペンは書きづらい。', vi: 'Cây bút này khó viết.' },
      { ja: '先生に相談しづらい。', vi: 'Khó mà tâm sự với thầy.' },
      { ja: '言いづらいことがある。', vi: 'Có chuyện khó nói.' },
    ],
  },
  {
    id: 'g058',
    title: '～通す（とおす）',
    meaning: 'Làm đến cùng / Suốt',
    structure: [
      'Vます + 通す',
    ],
    explanation:
      'Diễn tả hành động được thực hiện xuyên suốt, từ đầu đến cuối không bỏ cuộc.',
    examples: [
      { ja: '最後までやり通した。', vi: 'Làm đến cùng.' },
      { ja: '自分の意見を言い通した。', vi: 'Kiên quyết nói ý kiến của mình đến cùng.' },
    ],
  },
  {
    id: 'g059',
    title: '～上げる（あげる）',
    meaning: 'Hoàn thành / Xong',
    structure: [
      'Vます + 上げる / 上がる',
    ],
    explanation:
      'Diễn tả hành động được hoàn thành triệt để. Mang sắc thái tích cực, tự hào.',
    examples: [
      { ja: 'レポートを書き上げた。', vi: 'Viết xong bài báo cáo.' },
      { ja: 'ケーキを焼き上げた。', vi: 'Nướng xong bánh.' },
      { ja: 'プロジェクトを仕上げた。', vi: 'Hoàn thành xong dự án.' },
    ],
  },
  {
    id: 'g060',
    title: '～さえ～ば',
    meaning: 'Chỉ cần... thì...',
    structure: [
      'N + さえ + Vば / Aければ / Aなら',
      'Vます + さえすれば',
    ],
    explanation:
      'Diễn tả chỉ cần một điều kiện tối thiểu là đủ, miễn là có điều đó.',
    examples: [
      { ja: 'お金さえあれば、何でもできる。', vi: 'Chỉ cần có tiền thì làm gì cũng được.' },
      { ja: '薬を飲みさえすれば、治る。', vi: 'Chỉ cần uống thuốc thì sẽ khỏi.' },
      { ja: '天気さえよければ、出かけよう。', vi: 'Chỉ cần trời đẹp thì đi chơi.' },
    ],
  },
  {
    id: 'g061',
    title: '～さえ',
    meaning: 'Ngay cả / Thậm chí',
    structure: [
      'N + さえ',
    ],
    explanation:
      'Nhấn mạnh một trường hợp cực đoan. Nếu ngay cả điều này mà đúng thì những điều khác đương nhiên cũng vậy.',
    examples: [
      { ja: '子供でさえ知っている。', vi: 'Ngay cả trẻ con cũng biết.' },
      { ja: '名前さえ覚えていない。', vi: 'Thậm chí tên cũng không nhớ.' },
      { ja: '忙しくて食事さえできない。', vi: 'Bận đến mức ăn cơm cũng không được.' },
    ],
  },
  {
    id: 'g062',
    title: '～からこそ',
    meaning: 'Chính vì... nên',
    structure: [
      'V / Aい / Aな / N + からこそ',
    ],
    explanation:
      'Nhấn mạnh lý do, nguyên nhân. Mang sắc thái tích cực, chính vì điều đặc biệt đó.',
    examples: [
      { ja: '好きだからこそ、厳しく言うんだ。', vi: 'Chính vì thích nên mới nói nghiêm khắc.' },
      { ja: '努力したからこそ、成功した。', vi: 'Chính vì nỗ lực nên mới thành công.' },
      { ja: '友達だからこそ、本当のことを言う。', vi: 'Chính vì là bạn nên mới nói thật.' },
    ],
  },
  {
    id: 'g063',
    title: '～こそ',
    meaning: 'Chính là / Mới chính là',
    structure: [
      'N + こそ',
    ],
    explanation:
      'Nhấn mạnh danh từ đứng trước nó. Diễn tả rằng đó mới là điều quan trọng nhất.',
    examples: [
      { ja: 'こちらこそよろしくお願いします。', vi: 'Chính tôi mới phải nhờ anh.' },
      { ja: '今年こそ合格したい。', vi: 'Năm nay nhất định phải đỗ.' },
      { ja: '健康こそ一番大切だ。', vi: 'Sức khỏe mới là quan trọng nhất.' },
    ],
  },
  {
    id: 'g064',
    title: '～において / における',
    meaning: 'Tại / Trong / Ở (trang trọng)',
    structure: [
      'N + において / における + N',
    ],
    explanation:
      'Diễn tả nơi chốn, thời gian, lĩnh vực. Trang trọng hơn で.',
    examples: [
      { ja: '日本において、桜は特別な花です。', vi: 'Ở Nhật Bản, hoa anh đào là loài hoa đặc biệt.' },
      { ja: '会議は3階の会議室において行われます。', vi: 'Cuộc họp được tổ chức tại phòng họp tầng 3.' },
    ],
  },
  {
    id: 'g065',
    title: '～にわたって / にわたる',
    meaning: 'Suốt / Trải dài / Khắp',
    structure: [
      'N + にわたって / にわたる + N',
    ],
    explanation:
      'Diễn tả phạm vi rộng về thời gian hoặc không gian.',
    examples: [
      { ja: '3日間にわたって会議が行われた。', vi: 'Cuộc họp diễn ra suốt 3 ngày.' },
      { ja: '全国にわたって雨が降るでしょう。', vi: 'Trời mưa khắp cả nước.' },
    ],
  },
  {
    id: 'g066',
    title: '～に関して（にかんして）',
    meaning: 'Liên quan đến / Về',
    structure: [
      'N + に関して / に関する + N',
    ],
    explanation:
      'Diễn tả chủ đề liên quan. Trang trọng hơn について.',
    examples: [
      { ja: 'この問題に関して、調査が行われている。', vi: 'Liên quan đến vấn đề này, đang được điều tra.' },
      { ja: '環境に関する本を読んでいる。', vi: 'Tôi đang đọc sách liên quan đến môi trường.' },
    ],
  },
  {
    id: 'g067',
    title: '～によると / によれば',
    meaning: 'Theo / Dựa theo',
    structure: [
      'N + によると / によれば',
    ],
    explanation:
      'Dẫn nguồn thông tin. Thường đi với ～そうだ / ～ということだ.',
    examples: [
      { ja: '天気予報によると、明日は雨だそうだ。', vi: 'Theo dự báo thời tiết, nghe nói mai mưa.' },
      { ja: 'ニュースによると、事故があったそうだ。', vi: 'Theo tin tức, hình như có tai nạn.' },
    ],
  },
  {
    id: 'g068',
    title: '～ても',
    meaning: 'Dù / Cho dù / Mặc dù',
    structure: [
      'Vても / Aくても / Aでも / Nでも',
    ],
    explanation:
      'Diễn tả dù điều kiện ở mệnh đề trước có xảy ra thì kết quả vẫn không thay đổi.',
    examples: [
      { ja: '雨が降っても、試合はあります。', vi: 'Dù trời mưa, trận đấu vẫn diễn ra.' },
      { ja: '高くても買います。', vi: 'Dù đắt tôi cũng mua.' },
      { ja: '何回説明しても、わからない。', vi: 'Giải thích bao nhiêu lần cũng không hiểu.' },
    ],
  },
  {
    id: 'g069',
    title: '～たとえ～ても',
    meaning: 'Cho dù / Dù cho... đi nữa',
    structure: [
      'たとえ + Vても / Aくても / Aでも / Nでも',
    ],
    explanation:
      'Nhấn mạnh giả thuyết. Cho dù điều cực đoan nhất xảy ra thì kết quả vẫn không đổi.',
    examples: [
      { ja: 'たとえ雨が降っても、行きます。', vi: 'Cho dù mưa cũng đi.' },
      { ja: 'たとえ失敗しても、あきらめない。', vi: 'Cho dù thất bại cũng không bỏ cuộc.' },
    ],
  },
  {
    id: 'g070',
    title: '～てしまう / ちゃう',
    meaning: 'Hoàn tất / Lỡ / Mất rồi',
    structure: [
      'Vて + しまう (しまった)',
      'Vちゃう / Vちゃった (khẩu ngữ)',
    ],
    explanation:
      'Có 2 cách dùng: (1) Hoàn thành triệt để. (2) Diễn tả hối tiếc, không may (lỡ làm gì).',
    examples: [
      { ja: '宿題を全部やってしまった。', vi: 'Làm xong hết bài tập rồi.' },
      { ja: '携帯を電車に忘れてしまった。', vi: 'Lỡ quên điện thoại trên tàu.' },
      { ja: 'ケーキを全部食べちゃった。', vi: 'Ăn hết sạch bánh rồi.' },
    ],
  },
  {
    id: 'g071',
    title: '～ていく / てくる',
    meaning: 'Dần dần (thay đổi) / Từ trước đến nay',
    structure: [
      'Vて + いく (thay đổi từ giờ về sau)',
      'Vて + くる (thay đổi từ trước đến giờ)',
    ],
    explanation:
      'ていく: Diễn tả sự thay đổi tiếp diễn về tương lai. てくる: Diễn tả sự thay đổi từ quá khứ đến hiện tại.',
    examples: [
      { ja: 'これから暑くなっていく。', vi: 'Từ giờ sẽ nóng dần.' },
      { ja: '日本語が上手になってきた。', vi: 'Tiếng Nhật đã giỏi dần lên.' },
      { ja: '人口が減っていくだろう。', vi: 'Dân số có lẽ sẽ giảm dần.' },
    ],
  },
  {
    id: 'g072',
    title: '～ておく',
    meaning: 'Làm sẵn / Chuẩn bị trước',
    structure: [
      'Vて + おく (khẩu ngữ: ～とく)',
    ],
    explanation:
      'Diễn tả làm gì đó trước để chuẩn bị, hoặc để nguyên trạng thái.',
    examples: [
      { ja: '旅行の前にホテルを予約しておいた。', vi: 'Trước khi đi du lịch đã đặt khách sạn sẵn.' },
      { ja: '窓を開けておいてください。', vi: 'Hãy để cửa sổ mở nhé.' },
      { ja: '明日のために準備しておこう。', vi: 'Chuẩn bị sẵn cho ngày mai.' },
    ],
  },
  {
    id: 'g073',
    title: '～てはじめて',
    meaning: 'Kể từ khi... mới...',
    structure: [
      'Vて + はじめて',
    ],
    explanation:
      'Diễn tả sau khi trải nghiệm việc gì đó mới nhận ra, hiểu được điều quan trọng.',
    examples: [
      { ja: '病気になってはじめて健康の大切さがわかった。', vi: 'Khi bệnh mới hiểu sức khỏe quan trọng.' },
      { ja: '日本に来てはじめて寿司を食べた。', vi: 'Đến Nhật mới lần đầu ăn sushi.' },
    ],
  },
  {
    id: 'g074',
    title: '～から～にかけて',
    meaning: 'Từ... đến... (khoảng)',
    structure: [
      'N + から + N + にかけて',
    ],
    explanation:
      'Diễn tả phạm vi không chính xác về thời gian hoặc không gian.',
    examples: [
      { ja: '3月から4月にかけて桜が咲く。', vi: 'Khoảng từ tháng 3 đến tháng 4 hoa anh đào nở.' },
      { ja: '関東から東北にかけて雪が降る。', vi: 'Từ Kanto đến Tohoku có tuyết rơi.' },
    ],
  },
  {
    id: 'g075',
    title: '～に比べて（にくらべて）',
    meaning: 'So với',
    structure: [
      'N + に比べて / と比べて',
    ],
    explanation:
      'Dùng để so sánh hai đối tượng.',
    examples: [
      { ja: '去年に比べて、今年は暑い。', vi: 'So với năm ngoái, năm nay nóng hơn.' },
      { ja: '東京に比べて、大阪は物価が安い。', vi: 'So với Tokyo, Osaka giá cả rẻ hơn.' },
    ],
  },
  {
    id: 'g076',
    title: '～にしては',
    meaning: 'Tuy... nhưng / So với... thì',
    structure: [
      'V / N + にしては',
    ],
    explanation:
      'Diễn tả kết quả không như mong đợi, khác với thông thường khi xét theo tiêu chuẩn.',
    examples: [
      { ja: '初めてにしては、上手だ。', vi: 'So với lần đầu thì giỏi đấy.' },
      { ja: '日本人にしては、背が高い。', vi: 'So với người Nhật thì cao.' },
    ],
  },
  {
    id: 'g077',
    title: '～くせに',
    meaning: 'Mặc dù... nhưng (trách)',
    structure: [
      'V / Aい / Aな / N + くせに',
    ],
    explanation:
      'Diễn tả sự bất mãn, trách móc. Mặc dù A nhưng lại B (xấu).',
    examples: [
      { ja: '知っているくせに、教えてくれない。', vi: 'Biết mà không chịu nói.' },
      { ja: '自分でできないくせに、人を批判する。', vi: 'Tự mình không làm được mà chê người khác.' },
    ],
  },
  {
    id: 'g078',
    title: '～わりに',
    meaning: 'So với / Tuy... nhưng (trái ngược)',
    structure: [
      'V / Aい / Aな / N + わりに',
    ],
    explanation:
      'Diễn tả kết quả trái với kỳ vọng. Không mang sắc thái trách móc như くせに.',
    examples: [
      { ja: 'このレストランは高いわりに、おいしくない。', vi: 'Nhà hàng này đắt mà không ngon.' },
      { ja: '年のわりに、若く見える。', vi: 'So với tuổi, trông trẻ.' },
    ],
  },
  {
    id: 'g079',
    title: '～しかない',
    meaning: 'Đành phải / Chỉ còn cách',
    structure: [
      'Vる + しかない',
    ],
    explanation:
      'Diễn tả không có cách nào khác, chỉ có một lựa chọn duy nhất.',
    examples: [
      { ja: 'バスがないから、歩くしかない。', vi: 'Không có xe buýt nên đành đi bộ.' },
      { ja: '自分でやるしかない。', vi: 'Chỉ còn cách tự mình làm.' },
      { ja: '待つしかない。', vi: 'Đành phải chờ.' },
    ],
  },
  {
    id: 'g080',
    title: '～ことはない',
    meaning: 'Không cần / Không việc gì phải',
    structure: [
      'Vる + ことはない',
    ],
    explanation:
      'Diễn tả không cần thiết phải làm gì. Dùng khi an ủi hoặc khuyên nhủ.',
    examples: [
      { ja: '心配することはない。', vi: 'Không cần lo lắng.' },
      { ja: '急ぐことはない。ゆっくりでいい。', vi: 'Không cần vội. Từ từ cũng được.' },
      { ja: '泣くことはないよ。', vi: 'Không việc gì phải khóc.' },
    ],
  },
]
