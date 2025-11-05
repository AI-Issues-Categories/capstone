export type Language = 'ko' | 'en' | 'zh' | 'ja';

export interface Translations {
  // Header & Navigation
  appName: string;
  favorites: string;
  issueAnalysis: string;
  home: string;
  compare: string;
  help: string;
  
  // Main Dashboard
  latestTopics: string;
  topicsDescription: string;
  supportMost: string;
  opposeMost: string;
  alternativeSuggested: string;
  diverseOpinions: string;
  documentsCount: string;
  updated: string;
  viewDetails: string;
  searchPlaceholder: string;
  totalTopics: string;
  analyzedDocs: string;
  hotTopics: string;
  favoriteTopics: string;
  allTopics: string;
  myFavoriteTopics: string;
  topicList: string;
  items: string;
  welcomeMessage: string;
  welcomeDesc: string;
  noTopicsYet: string;
  noTopicsYetDesc: string;
  startByAnalyzing: string;
  
  // Favorite Topics
  noFavorites: string;
  noFavoritesDesc: string;
  browseTopics: string;
  myFavorites: string;
  totalFavorites: string;
  manageDesc: string;
  
  // Topic Detail
  backToHome: string;
  share: string;
  linkCopied: string;
  linkCopiedDesc: string;
  copyLink: string;
  yourOpinion: string;
  thanksForVoting: string;
  clickAgainToCancel: string;
  oneVotePerTopic: string;
  support: string;
  oppose: string;
  neutral: string;
  votes: string;
  totalVoters: string;
  opinionDistribution: string;
  opinionDistributionDesc: string;
  alternative: string;
  downloadChart: string;
  compareOpinions: string;
  exitCompareMode: string;
  selectedOpinionDetail: string;
  selectedOpinionDesc: string;
  mainOpinions: string;
  mainOpinionsDesc: string;
  viewOriginal: string;
  viewOriginalDesc: string;
  viewOriginalSelected: string;
  supportOpinion: string;
  opposeOpinion: string;
  alternativeOpinion: string;
  neutralOpinion: string;
  mainSources: string;
  analyzedDocs2: string;
  
  // Vote messages
  alreadyVoted: string;
  alreadyVotedDesc: string;
  voteComplete: string;
  votedFor: string;
  voteChanged: string;
  voteCancelled: string;
  voteCancelledDesc: string;
  
  // At a Glance
  atAGlance: string;
  atAGlanceDesc: string;
  supportSummaryTitle: string;
  opposeSummaryTitle: string;
  alternativeSummaryTitle: string;
  
  // Keyword Cloud
  keywordCloud: string;
  keywordCloudDesc: string;
  
  // Favorite Button
  addToFavorites: string;
  removeFromFavorites: string;
  addedToFavorites: string;
  removedFromFavorites: string;
  
  // Source types
  news: string;
  youtube: string;
  blog: string;
  
  // Comparison View
  compareTopics: string;
  compareTopicsDesc: string;
  noTopicsToCompare: string;
  selectTwoTopics: string;
  selectTwoTopicsDesc: string;
  topic1: string;
  topic2: string;
  selectTopic: string;
  comparing: string;
  comparisonResult: string;
  comparisonResultDesc: string;
  basicInfo: string;
  stance: string;
  documents: string;
  keywords: string;
  lastUpdate: string;
  opinionComparison: string;
  supportPercentage: string;
  opposePercentage: string;
  alternativePercentage: string;
  
  // Cluster Comparison
  clusterComparison: string;
  clusterComparisonDesc: string;
  opinion1: string;
  opinion2: string;
  mainArguments: string;
  sourceInfo: string;
  similarity: string;
  difference: string;
  
  // Document List
  relatedDocuments: string;
  relatedDocumentsDesc: string;
  sortBy: string;
  sortByDate: string;
  sortByRelevance: string;
  filterBySource: string;
  all: string;
  showingDocs: string;
  noDocuments: string;
  
  // Help Dialog
  helpTitle: string;
  helpDesc: string;
  whatIsOpinionMap: string;
  whatIsOpinionMapDesc: string;
  howToUse1: string;
  howToUse1Desc: string;
  howToUse2: string;
  howToUse2Desc: string;
  howToUse3: string;
  howToUse3Desc: string;
  howToUse4: string;
  howToUse4Desc: string;
  chartGuide: string;
  chartColors: string;
  blueSupport: string;
  redOppose: string;
  greenAlternative: string;
  grayNeutral: string;
  
  // Language
  language: string;
  korean: string;
  english: string;
  chinese: string;
  japanese: string;
  
  // Issue Analysis
  issueAnalysisSubtitle: string;
  issueAnalysisDesc: string;
  inputText: string;
  inputUrl: string;
  pasteArticle: string;
  pasteArticlePlaceholder: string;
  enterUrl: string;
  enterUrlPlaceholder: string;
  analysisNote: string;
  analyzing: string;
  startAnalysis: string;
  extractedKeywords: string;
  extractedKeywordsDesc: string;
  foundOpinions: string;
  futurePrediction: string;
  futurePredictionDesc: string;
}

export const translations: Record<Language, Translations> = {
  ko: {
    appName: '이슈맵',
    favorites: '내 관심 이슈',
    issueAnalysis: '이슈 분석',
    home: '홈',
    compare: '비교하기',
    help: '도움말',
    
    latestTopics: '최신 이슈',
    topicsDescription: 'AI가 분석한 최신 여론 이슈들입니다',
    supportMost: '찬성 많음',
    opposeMost: '반대 많음',
    alternativeSuggested: '대안 제시',
    diverseOpinions: '다양한 의견',
    documentsCount: '개의 글',
    updated: '업데이트',
    viewDetails: '자세히 보기',
    searchPlaceholder: '예: 의대 증원, 기후변화, AI 규제...',
    totalTopics: '전체 이슈',
    analyzedDocs: '분석된 글',
    hotTopics: '인기 이슈',
    favoriteTopics: '관심 이슈',
    allTopics: '전체 이슈',
    myFavoriteTopics: '내 관심 이슈',
    topicList: '전체 이슈 목록',
    items: '개',
    welcomeMessage: '지금 주목받는 이슈를 확인하세요',
    welcomeDesc: '뉴스, 유튜브, 블로그에서 모은 다양한 의견을 한눈에 비교해보세요',
    noTopicsYet: '아직 분석된 이슈가 없습니다',
    noTopicsYetDesc: '이슈 분석 기능을 사용하여 뉴스나 블로그 글을 분석하고, AI가 찾은 다양한 의견들을 확인해보세요.',
    startByAnalyzing: '상단의 "이슈 분석" 버튼을 클릭하여 시작하세요!',
    
    noFavorites: '아직 관심 이슈가 없습니다',
    noFavoritesDesc: '홈 화면에서 관심있는 이슈를 추가해보세요.\n관심 이슈로 등록하면 여기서 한눈에 볼 수 있습니다.',
    browseTopics: '이슈 둘러보기',
    myFavorites: '내 관심 이슈',
    totalFavorites: '개의 관심 이슈',
    manageDesc: '등록한 이슈들을 한눈에 확인하고 관리할 수 있습니다',
    
    backToHome: '홈으로 돌아가기',
    share: '공유',
    linkCopied: '링크가 복사되었습니다!',
    linkCopiedDesc: '이 링크를 공유하면 같은 화면을 볼 수 있습니다',
    copyLink: '링크 복사',
    yourOpinion: '이 이슈에 대한 당신의 의견은?',
    thanksForVoting: '투표해주셔서 감사합니다!',
    clickAgainToCancel: '다시 클릭하면 취소하거나 변경할 수 있습니다',
    oneVotePerTopic: '의견을 선택해주세요. 다시 클릭하면 변경할 수 있습니다',
    support: '찬성',
    oppose: '반대',
    neutral: '중립',
    votes: '표',
    totalVoters: '명이 투표에 참여했습니다',
    opinionDistribution: '의견 분포',
    opinionDistributionDesc: '이 이슈에 대한 찬성, 반대, 대안 의견의 비율입니다',
    alternative: '대안',
    downloadChart: '차트 이미지 저장',
    compareOpinions: '의견 직접 비교하기',
    exitCompareMode: '비교 모드 종료',
    selectedOpinionDetail: '선택한 의견 상세',
    selectedOpinionDesc: '이 클러스터의 주요 주장과 출처입니다',
    mainOpinions: '주요 의견들',
    mainOpinionsDesc: '각 입장별로 가장 많이 나타나는 주장들입니다',
    viewOriginal: '원문 보기',
    viewOriginalDesc: '개의 뉴스, 영상, 블로그 글',
    viewOriginalSelected: '',
    supportOpinion: '찬성 의견',
    opposeOpinion: '반대 의견',
    alternativeOpinion: '대안 의견',
    neutralOpinion: '중립 의견',
    mainSources: '주요 출처',
    analyzedDocs2: '이 이슈에 대해',
    
    alreadyVoted: '이미 투표하셨습니다',
    alreadyVotedDesc: '한 이슈당 한 번만 투표할 수 있습니다.',
    voteComplete: '투표가 완료되었습니다!',
    votedFor: '의견으로 투표하셨습니다.',
    voteChanged: '투표가 변경되었습니다!',
    voteCancelled: '투표가 취소되었습니다',
    voteCancelledDesc: '다시 투표할 수 있습니다',
    
    atAGlance: '핵심 요약',
    atAGlanceDesc: 'AI가 요약한 주요 입장별 핵심 주장입니다',
    supportSummaryTitle: '찬성 입장 요약',
    opposeSummaryTitle: '반대 입장 요약',
    alternativeSummaryTitle: '대안 제시 요약',
    
    keywordCloud: '키워드 클라우드',
    keywordCloudDesc: '이 이슈에서 자주 언급되는 키워드입니다',
    
    addToFavorites: '관심 이슈 추가',
    removeFromFavorites: '관심 이슈 해제',
    addedToFavorites: '관심 이슈에 추가되었습니다!',
    removedFromFavorites: '관심 이슈에서 제거되었습니다',
    
    news: '뉴스',
    youtube: '유튜브',
    blog: '블로그',
    
    compareTopics: '이슈 비교하기',
    compareTopicsDesc: '두 이슈의 여론 분포와 특징을 비교 분석합니다',
    noTopicsToCompare: '비교할 이슈가 없습니다. 먼저 이슈를 분석해주세요.',
    selectTwoTopics: '비교할 이슈 2개를 선택하세요',
    selectTwoTopicsDesc: '같은 주제에 대한 시간별 변화나 관련 이슈를 비교해보세요',
    topic1: '이슈 1',
    topic2: '이슈 2',
    selectTopic: '이슈 선택',
    comparing: '비교중',
    comparisonResult: '비교 결과',
    comparisonResultDesc: '두 이슈의 주요 차이점과 공통점을 확인하세요',
    basicInfo: '기본 정보',
    stance: '주요 입장',
    documents: '문서 수',
    keywords: '키워드',
    lastUpdate: '마지막 업데이트',
    opinionComparison: '의견 분포 비교',
    supportPercentage: '찬성 비율',
    opposePercentage: '반대 비율',
    alternativePercentage: '대안 비율',
    
    clusterComparison: '의견 비교',
    clusterComparisonDesc: '선택한 두 의견의 주장과 출처를 비교합니다',
    opinion1: '의견 1',
    opinion2: '의견 2',
    mainArguments: '주요 주장',
    sourceInfo: '출처 정보',
    similarity: '유사점',
    difference: '차이점',
    
    relatedDocuments: '관련 문서',
    relatedDocumentsDesc: '이 의견과 관련된 뉴스, 유튜브, 블로그 글입니다',
    sortBy: '정렬',
    sortByDate: '최신순',
    sortByRelevance: '관련도순',
    filterBySource: '출처 필터',
    all: '전체',
    showingDocs: '개 문서 표시 중',
    noDocuments: '관련 문서가 없습니다',
    
  helpTitle: '이슈맵 사용 가이드',
    helpDesc: '이슈에 대한 다양한 의견을 쉽게 확인하는 방법',
  whatIsOpinionMap: '🎯 이슈맵이란?',
  whatIsOpinionMapDesc: '뉴스, 유튜브, 블로그에서 같은 이슈에 대한 다양한 의견을 자동으로 모아서 "찬성", "반대", "대안" 등으로 정리해드립니다. 한 번에 모든 관점을 볼 수 있어요!',
    howToUse1: '관심있는 이슈 찾기',
    howToUse1Desc: '홈 화면에서 현재 이슈를 확인하거나 검색창에 키워드를 입력하세요.',
    howToUse2: '의견 분포 확인하기',
    howToUse2Desc: '버블 차트에서 원의 크기는 관련 글의 수를, 색깔은 의견 경향을 나타냅니다.',
    howToUse3: '상세 의견 살펴보기',
    howToUse3Desc: '각 버블을 클릭하면 해당 입장의 주요 주장과 출처를 확인할 수 있습니다.',
    howToUse4: '이슈 비교하기',
    howToUse4Desc: '여러 이슈를 동시에 비교하여 여론의 차이를 분석할 수 있습니다.',
    chartGuide: '📊 차트 색상 가이드',
    chartColors: '각 색상은 의견의 입장을 나타냅니다',
    blueSupport: '파란색 = 찬성 입장',
    redOppose: '빨간색 = 반대 입장',
    greenAlternative: '초록색 = 대안 제시',
    grayNeutral: '회색 = 중립적 입장',
    
    language: '언어',
    korean: '한국어',
    english: 'English',
    chinese: '中文',
    japanese: '日本語',
    
    issueAnalysisSubtitle: 'AI가 뉴스를 분석하고 다양한 의견을 찾아드립니다',
    issueAnalysisDesc: '뉴스 기사나 블로그 글의 텍스트를 붙여넣거나 URL을 입력하세요. AI가 해당 이슈에 대한 찬성/반대/중립/대안 의견을 인터넷에서 찾아 분석해드립니다.',
    inputText: '텍스트 입력',
    inputUrl: 'URL 입력',
    pasteArticle: '뉴스 기사 또는 블로그 글 붙여넣기',
    pasteArticlePlaceholder: '여기에 뉴스 기사나 블로그 글의 전체 텍스트를 붙여넣으세요...',
    enterUrl: '뉴스/유튜브/블로그 URL 입력',
    enterUrlPlaceholder: 'https://example.com/news-article',
    analysisNote: '💡 AI가 입력된 내용이 적절한 뉴스나 이슈인지 자동으로 판단합니다. 부적절한 내용은 걸러집니다.',
    analyzing: '분석 중...',
    startAnalysis: '분석 시작',
    extractedKeywords: '추출된 키워드',
    extractedKeywordsDesc: 'AI가 추출한 이슈의 핵심 키워드입니다',
    foundOpinions: '{count}개의 관련 의견을 찾았습니다',
    futurePrediction: '미래 전망',
    futurePredictionDesc: 'AI가 분석한 이 이슈로 인한 미래 변화 예측',
  },
  en: {
    appName: 'OpinionMap',
    favorites: 'My Interests',
    issueAnalysis: 'Issue Analysis',
    home: 'Home',
    compare: 'Compare',
    help: 'Help',
    
    latestTopics: 'Latest Topics',
    topicsDescription: 'Latest public opinion topics analyzed by AI',
    supportMost: 'Mostly Support',
    opposeMost: 'Mostly Oppose',
    alternativeSuggested: 'Alternative Suggested',
    diverseOpinions: 'Diverse Opinions',
    documentsCount: ' documents',
    updated: 'updated',
    viewDetails: 'View Details',
    searchPlaceholder: 'e.g., medical school expansion, climate change, AI regulation...',
    totalTopics: 'Total Topics',
    analyzedDocs: 'Analyzed Documents',
    hotTopics: 'Trending',
    favoriteTopics: 'Favorites',
    allTopics: 'All Topics',
    myFavoriteTopics: 'My Favorite Topics',
    topicList: 'All Topics',
    items: '',
    welcomeMessage: 'Explore trending topics',
    welcomeDesc: 'Compare diverse opinions from news, YouTube, and blogs at a glance',
    noTopicsYet: 'No analyzed topics yet',
    noTopicsYetDesc: 'Use the Issue Analysis feature to analyze news or blog posts and discover diverse opinions found by AI.',
    startByAnalyzing: 'Click the "Issue Analysis" button at the top to get started!',
    
    noFavorites: 'No favorite topics yet',
    noFavoritesDesc: 'Add topics you\'re interested in from the home screen.\nYou can see them all at once here.',
    browseTopics: 'Browse Topics',
    myFavorites: 'My Favorite Topics',
    totalFavorites: ' favorite topics',
    manageDesc: 'View and manage your registered topics at a glance',
    
    backToHome: 'Back to Home',
    share: 'Share',
    linkCopied: 'Link copied!',
    linkCopiedDesc: 'Share this link to view the same page',
    copyLink: 'Copy Link',
    yourOpinion: 'What\'s your opinion on this issue?',
    thanksForVoting: 'Thanks for voting!',
    clickAgainToCancel: 'Click again to cancel or change your vote',
    oneVotePerTopic: 'Choose your opinion. Click again to change',
    support: 'Support',
    oppose: 'Oppose',
    neutral: 'Neutral',
    votes: ' votes',
    totalVoters: ' people voted',
    opinionDistribution: 'Opinion Distribution',
    opinionDistributionDesc: 'The ratio of support, opposition, and alternative opinions on this issue',
    alternative: 'Alternative',
    downloadChart: 'Download Chart',
    compareOpinions: 'Compare Opinions',
    exitCompareMode: 'Exit Compare Mode',
    selectedOpinionDetail: 'Selected Opinion Details',
    selectedOpinionDesc: 'Main arguments and sources of this cluster',
    mainOpinions: 'Main Opinions',
    mainOpinionsDesc: 'The most common arguments for each position. Click a point on the opinion map to see details',
    viewOriginal: 'View Original',
    viewOriginalDesc: ' news, videos, and blog posts',
    viewOriginalSelected: '',
    supportOpinion: 'Support Opinion',
    opposeOpinion: 'Oppose Opinion',
    alternativeOpinion: 'Alternative Opinion',
    neutralOpinion: 'Neutral Opinion',
    mainSources: 'Main Sources',
    analyzedDocs2: 'Analyzed',
    
    alreadyVoted: 'You already voted',
    alreadyVotedDesc: 'You can vote once per topic.',
    voteComplete: 'Vote completed!',
    votedFor: 'You voted for',
    voteChanged: 'Vote changed!',
    voteCancelled: 'Vote cancelled',
    voteCancelledDesc: 'You can vote again',
    
    atAGlance: 'At a Glance',
    atAGlanceDesc: 'AI-summarized key arguments for each position',
    supportSummaryTitle: 'Support Summary',
    opposeSummaryTitle: 'Opposition Summary',
    alternativeSummaryTitle: 'Alternative Summary',
    
    keywordCloud: 'Keyword Cloud',
    keywordCloudDesc: 'Frequently mentioned keywords in this issue',
    
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    addedToFavorites: 'Added to favorites!',
    removedFromFavorites: 'Removed from favorites',
    
    news: 'News',
    youtube: 'YouTube',
    blog: 'Blog',
    
    compareTopics: 'Compare Topics',
    compareTopicsDesc: 'Analyze and compare opinion distribution and characteristics of two topics',
    noTopicsToCompare: 'No topics to compare. Please analyze some topics first.',
    selectTwoTopics: 'Select two topics to compare',
    selectTwoTopicsDesc: 'Compare changes over time or related issues on the same subject',
    topic1: 'Topic 1',
    topic2: 'Topic 2',
    selectTopic: 'Select Topic',
    comparing: 'Comparing',
    comparisonResult: 'Comparison Result',
    comparisonResultDesc: 'Check key differences and similarities between two topics',
    basicInfo: 'Basic Information',
    stance: 'Main Stance',
    documents: 'Documents',
    keywords: 'Keywords',
    lastUpdate: 'Last Update',
    opinionComparison: 'Opinion Distribution Comparison',
    supportPercentage: 'Support %',
    opposePercentage: 'Oppose %',
    alternativePercentage: 'Alternative %',
    
    clusterComparison: 'Opinion Comparison',
    clusterComparisonDesc: 'Compare arguments and sources of two selected opinions',
    opinion1: 'Opinion 1',
    opinion2: 'Opinion 2',
    mainArguments: 'Main Arguments',
    sourceInfo: 'Source Information',
    similarity: 'Similarities',
    difference: 'Differences',
    
    relatedDocuments: 'Related Documents',
    relatedDocumentsDesc: 'News, YouTube videos, and blog posts related to this opinion',
    sortBy: 'Sort by',
    sortByDate: 'Latest',
    sortByRelevance: 'Relevance',
    filterBySource: 'Filter by Source',
    all: 'All',
    showingDocs: ' documents',
    noDocuments: 'No related documents',
    
    helpTitle: 'OpinionMap User Guide',
    helpDesc: 'How to easily check various opinions on issues',
    whatIsOpinionMap: '🎯 What is OpinionMap?',
    whatIsOpinionMapDesc: 'Automatically collect various opinions on the same issue from news, YouTube, and blogs and organize them by "support", "oppose", "alternative", etc. See all perspectives at once!',
    howToUse1: 'Find topics of interest',
    howToUse1Desc: 'Check current topics on the home screen or enter keywords in the search box.',
    howToUse2: 'Check opinion distribution',
    howToUse2Desc: 'In the bubble chart, circle size represents the number of related articles, and color represents opinion tendency.',
    howToUse3: 'Explore detailed opinions',
    howToUse3Desc: 'Click on each bubble to see main arguments and sources for that position.',
    howToUse4: 'Compare topics',
    howToUse4Desc: 'Compare multiple topics simultaneously to analyze differences in public opinion.',
    chartGuide: '📊 Chart Color Guide',
    chartColors: 'Each color represents the opinion stance',
    blueSupport: 'Blue = Support stance',
    redOppose: 'Red = Opposition stance',
    greenAlternative: 'Green = Alternative suggestion',
    grayNeutral: 'Gray = Neutral stance',
    
    language: 'Language',
    korean: '한국어',
    english: 'English',
    chinese: '中文',
    japanese: '日本語',
    
    issueAnalysisSubtitle: 'AI analyzes news and finds diverse opinions',
    issueAnalysisDesc: 'Paste news article or blog text, or enter a URL. AI will find and analyze support/oppose/neutral/alternative opinions on the internet.',
    inputText: 'Input Text',
    inputUrl: 'Input URL',
    pasteArticle: 'Paste news article or blog post',
    pasteArticlePlaceholder: 'Paste the full text of a news article or blog post here...',
    enterUrl: 'Enter news/YouTube/blog URL',
    enterUrlPlaceholder: 'https://example.com/news-article',
    analysisNote: '💡 AI automatically determines if the input content is appropriate news or issue. Inappropriate content will be filtered out.',
    analyzing: 'Analyzing...',
    startAnalysis: 'Start Analysis',
    extractedKeywords: 'Extracted Keywords',
    extractedKeywordsDesc: 'Key keywords of the issue extracted by AI',
    foundOpinions: 'Found {count} related opinions',
    futurePrediction: 'Future Outlook',
    futurePredictionDesc: 'AI-analyzed future change prediction from this issue',
  },
  zh: {
    appName: 'OpinionMap',
    favorites: '我的关注',
    issueAnalysis: '议题分析',
    home: '首页',
    compare: '比较',
    help: '帮助',
    
    latestTopics: '最新话题',
    topicsDescription: 'AI分析的最新舆论话题',
    supportMost: '多数支持',
    opposeMost: '多数反对',
    alternativeSuggested: '提出替代方案',
    diverseOpinions: '多元观点',
    documentsCount: '篇文章',
    updated: '更新',
    viewDetails: '查看详情',
    searchPlaceholder: '例如：医学院扩招、气候变化、AI监管...',
    totalTopics: '总话题',
    analyzedDocs: '已分析文档',
    hotTopics: '热门话题',
    favoriteTopics: '关注话题',
    allTopics: '全部话题',
    myFavoriteTopics: '我的关注话题',
    topicList: '全部话题列表',
    items: '个',
    welcomeMessage: '探索热门话题',
    welcomeDesc: '一次查看来自新闻、YouTube和博客的多元观点',
    noTopicsYet: '尚未分析的议题',
    noTopicsYetDesc: '使用议题分析功能分析新闻或博客文章，发现AI找到的多元观点。',
    startByAnalyzing: '点击顶部的"议题分析"按钮开始！',
    
    noFavorites: '还没有关注的话题',
    noFavoritesDesc: '从主页添加您感兴趣的话题。\n添加后可以在这里一目了然。',
    browseTopics: '浏览话题',
    myFavorites: '我关注的话题',
    totalFavorites: '个关注话题',
    manageDesc: '一览并管理您注册的话题',
    
    backToHome: '返回主页',
    share: '分享',
    linkCopied: '链接已复制！',
    linkCopiedDesc: '分享此链接以查看相同页面',
    copyLink: '复制链接',
    yourOpinion: '您对这个问题的看法是？',
    thanksForVoting: '感谢您的投票！',
    clickAgainToCancel: '再次点击可取消或更改投票',
    oneVotePerTopic: '选择您的意见。再次点击可更改',
    support: '支持',
    oppose: '反对',
    neutral: '中立',
    votes: '票',
    totalVoters: '人参与了投票',
    opinionDistribution: '观点分布',
    opinionDistributionDesc: '这个问题的支持、反对和替代观点的比例',
    alternative: '替代方案',
    downloadChart: '下载图表',
    compareOpinions: '直接比较观点',
    exitCompareMode: '退出比较模式',
    selectedOpinionDetail: '选定观点详情',
    selectedOpinionDesc: '该集群的主要论点和来源',
    mainOpinions: '主要观点',
    mainOpinionsDesc: '每个立场最常见的论点。点击观点地图上的点查看详情',
    viewOriginal: '查看原文',
    viewOriginalDesc: '篇新闻、视频和博客文章',
    viewOriginalSelected: '',
    supportOpinion: '支持观点',
    opposeOpinion: '反对观点',
    alternativeOpinion: '替代观点',
    neutralOpinion: '中立观点',
    mainSources: '主要来源',
    analyzedDocs2: '已分析',
    
    alreadyVoted: '您已经投过票了',
    alreadyVotedDesc: '每个话题只能投票一次。',
    voteComplete: '投票完成！',
    votedFor: '您投票给了',
    voteChanged: '投票已更改！',
    voteCancelled: '投票已取消',
    voteCancelledDesc: '您可以再次投票',
    
    atAGlance: '核心摘要',
    atAGlanceDesc: 'AI总结的各立场核心论点',
    supportSummaryTitle: '支持立场摘要',
    opposeSummaryTitle: '反对立场摘要',
    alternativeSummaryTitle: '替代方案摘要',
    
    keywordCloud: '关键词云',
    keywordCloudDesc: '这个问题中经常提到的关键词',
    
    addToFavorites: '添加到关注',
    removeFromFavorites: '取消关注',
    addedToFavorites: '已添加到关注！',
    removedFromFavorites: '已取消关注',
    
    news: '新闻',
    youtube: 'YouTube',
    blog: '博客',
    
    compareTopics: '比较话题',
    compareTopicsDesc: '分析和比较两个话题的观点分布和特征',
    noTopicsToCompare: '没有要比较的议题。请先分析一些议题。',
    selectTwoTopics: '选择两个话题进行比较',
    selectTwoTopicsDesc: '比较同一主题的时间变化或相关问题',
    topic1: '话题1',
    topic2: '话题2',
    selectTopic: '选择话题',
    comparing: '比较中',
    comparisonResult: '比较结果',
    comparisonResultDesc: '查看两个话题的主要差异和相似之处',
    basicInfo: '基本信息',
    stance: '主要立场',
    documents: '文档数',
    keywords: '关键词',
    lastUpdate: '最后更新',
    opinionComparison: '观点分布比较',
    supportPercentage: '支持率',
    opposePercentage: '反对率',
    alternativePercentage: '替代方案率',
    
    clusterComparison: '观点比较',
    clusterComparisonDesc: '比较两个选定观点的论点和来源',
    opinion1: '观点1',
    opinion2: '观点2',
    mainArguments: '主要论点',
    sourceInfo: '来源信息',
    similarity: '相似之处',
    difference: '差异',
    
    relatedDocuments: '相关文档',
    relatedDocumentsDesc: '与此观点相关的新闻、视频和博客文章',
    sortBy: '排序',
    sortByDate: '最新',
    sortByRelevance: '相关度',
    filterBySource: '按来源筛选',
    all: '全部',
    showingDocs: '个文档',
    noDocuments: '无相关文档',
    
    helpTitle: 'OpinionMap使用指南',
    helpDesc: '如何轻松查看各种观点',
    whatIsOpinionMap: '🎯 什么是OpinionMap？',
    whatIsOpinionMapDesc: '自动收集来自新闻、YouTube和博客的同一问题的各种观点，并按"支持"、"反对"、"替代方案"等进行整理。一次查看所有观点！',
    howToUse1: '查找感兴趣的话题',
    howToUse1Desc: '在主页上查看当前话题或在搜索框中输入关键词。',
    howToUse2: '查看观点分布',
    howToUse2Desc: '在气泡图中，圆圈大小表示相关文章数量，颜色表示观点倾向。',
    howToUse3: '探索详细观点',
    howToUse3Desc: '点击每个气泡以查看该立场的主要论点和来源。',
    howToUse4: '比较话题',
    howToUse4Desc: '同时比较多个话题以分析公众意见的差异。',
    chartGuide: '📊 图表颜色指南',
    chartColors: '每种颜色代表观点立场',
    blueSupport: '蓝色 = 支持立场',
    redOppose: '红色 = 反对立场',
    greenAlternative: '绿色 = 替代建议',
    grayNeutral: '灰色 = 中立立场',
    
    language: '语言',
    korean: '한국어',
    english: 'English',
    chinese: '中文',
    japanese: '日本語',
    
    issueAnalysisSubtitle: 'AI分析新闻并找到多元观点',
    issueAnalysisDesc: '粘贴新闻文章或博客文本，或输入URL。AI将在互联网上找到并分析支持/反对/中立/替代观点。',
    inputText: '输入文本',
    inputUrl: '输入URL',
    pasteArticle: '粘贴新闻文章或博客文章',
    pasteArticlePlaceholder: '在此粘贴新闻文章或博客文章的完整文本...',
    enterUrl: '输入新闻/YouTube/博客URL',
    enterUrlPlaceholder: 'https://example.com/news-article',
    analysisNote: '💡 AI会自动判断输入内容是否为适当的新闻或议题。不适当的内容将被过滤。',
    analyzing: '分析中...',
    startAnalysis: '开始分析',
    extractedKeywords: '提取的关键词',
    extractedKeywordsDesc: 'AI提取的议题核心关键词',
    foundOpinions: '找到{count}个相关观点',
    futurePrediction: '未来展望',
    futurePredictionDesc: 'AI分析的此议题导致的未来变化预测',
  },
  ja: {
    appName: 'OpinionMap',
    favorites: 'マイ関心',
    issueAnalysis: '議題分析',
    home: 'ホーム',
    compare: '比較',
    help: 'ヘルプ',
    
    latestTopics: '最新トピック',
    topicsDescription: 'AIが分析した最新の世論トピックです',
    supportMost: '賛成多数',
    opposeMost: '反対多数',
    alternativeSuggested: '代替案提示',
    diverseOpinions: '多様な意見',
    documentsCount: '件の記事',
    updated: '更新',
    viewDetails: '詳細を見る',
    searchPlaceholder: '例：医学部定員増、気候変動、AI規制...',
    totalTopics: '全トピック',
    analyzedDocs: '分析済み文書',
    hotTopics: '人気トピック',
    favoriteTopics: '関心トピック',
    allTopics: '全トピック',
    myFavoriteTopics: 'マイ関心トピック',
    topicList: '全トピックリスト',
    items: '件',
    welcomeMessage: '注目のトピックを探索',
    welcomeDesc: 'ニュース、YouTube、ブログからの多様な意見を一度に比較',
    noTopicsYet: 'まだ分析された議題はありません',
    noTopicsYetDesc: '議題分析機能を使用してニュースやブログ記事を分析し、AIが見つけた多様な意見を確認してください。',
    startByAnalyzing: '上部の「議題分析」ボタンをクリックして開始してください！',
    
    noFavorites: 'まだ関心トピックがありません',
    noFavoritesDesc: 'ホーム画面から興味のあるトピックを追加してください。\n関心トピックとして登録すると、ここで一覧できます。',
    browseTopics: 'トピックを見る',
    myFavorites: 'マイ関心トピック',
    totalFavorites: '件の関心トピック',
    manageDesc: '登録したトピックを一覧して管理できます',
    
    backToHome: 'ホームに戻る',
    share: '共有',
    linkCopied: 'リンクをコピーしました！',
    linkCopiedDesc: 'このリンクを共有すると同じページが表示されます',
    copyLink: 'リンクをコピー',
    yourOpinion: 'この問題についてのあなたの意見は？',
    thanksForVoting: '投票ありがとうございます！',
    clickAgainToCancel: '再度クリックでキャンセルまたは変更できます',
    oneVotePerTopic: '意見を選んでください。再度クリックで変更できます',
    support: '賛成',
    oppose: '反対',
    neutral: '中立',
    votes: '票',
    totalVoters: '人が投票に参加しました',
    opinionDistribution: '意見分布',
    opinionDistributionDesc: 'この問題に関する賛成、反対、代替意見の割合です',
    alternative: '代替案',
    downloadChart: 'チャートをダウンロード',
    compareOpinions: '意見を直接比較',
    exitCompareMode: '比較モード終了',
    selectedOpinionDetail: '選択した意見の詳細',
    selectedOpinionDesc: 'このクラスターの主な主張と出典です',
    mainOpinions: '主な意見',
    mainOpinionsDesc: '各立場で最もよく見られる主張です。意見マップの点をクリックすると詳細が見られます',
    viewOriginal: '原文を見る',
    viewOriginalDesc: '件のニュース、動画、ブログ記事',
    viewOriginalSelected: '',
    supportOpinion: '賛成意見',
    opposeOpinion: '反対意見',
    alternativeOpinion: '代替意見',
    neutralOpinion: '中立意見',
    mainSources: '主な出典',
    analyzedDocs2: '分析済み',
    
    alreadyVoted: 'すでに投票されています',
    alreadyVotedDesc: 'トピックごとに1回投票できます。',
    voteComplete: '投票完了！',
    votedFor: 'に投票しました。',
    voteChanged: '投票が変更されました！',
    voteCancelled: '投票がキャンセルされました',
    voteCancelledDesc: '再度投票できます',
    
    atAGlance: '概要',
    atAGlanceDesc: 'AIが要約した各立場の主要論点です',
    supportSummaryTitle: '賛成立場の要約',
    opposeSummaryTitle: '反対立場の要約',
    alternativeSummaryTitle: '代替案の要約',
    
    keywordCloud: 'キーワードクラウド',
    keywordCloudDesc: 'この問題でよく言及されるキーワードです',
    
    addToFavorites: '関心トピックに追加',
    removeFromFavorites: '関心トピックから削除',
    addedToFavorites: '関心トピックに追加されました！',
    removedFromFavorites: '関心トピックから削除されました',
    
    news: 'ニュース',
    youtube: 'YouTube',
    blog: 'ブログ',
    
    compareTopics: 'トピック比較',
    compareTopicsDesc: '2つのトピックの意見分布と特徴を分析・比較',
    noTopicsToCompare: '比較するトピックがありません。まずトピックを分析してください。',
    selectTwoTopics: '比較する2つのトピックを選択',
    selectTwoTopicsDesc: '同じテーマの時間変化や関連問題を比較',
    topic1: 'トピック1',
    topic2: 'トピック2',
    selectTopic: 'トピック選択',
    comparing: '比較中',
    comparisonResult: '比較結果',
    comparisonResultDesc: '2つのトピックの主な違いと類似点を確認',
    basicInfo: '基本情報',
    stance: '主な立場',
    documents: '文書数',
    keywords: 'キーワード',
    lastUpdate: '最終更新',
    opinionComparison: '意見分布比較',
    supportPercentage: '賛成率',
    opposePercentage: '反対率',
    alternativePercentage: '代替案率',
    
    clusterComparison: '意見比較',
    clusterComparisonDesc: '選択した2つの意見の主張と出典を比較',
    opinion1: '意見1',
    opinion2: '意見2',
    mainArguments: '主な主張',
    sourceInfo: '出典情報',
    similarity: '類似点',
    difference: '相違点',
    
    relatedDocuments: '関連文書',
    relatedDocumentsDesc: 'この意見に関連するニュース、動画、ブログ記事',
    sortBy: '並び替え',
    sortByDate: '最新順',
    sortByRelevance: '関連度順',
    filterBySource: '出典でフィルター',
    all: '全て',
    showingDocs: '件の文書',
    noDocuments: '関連文書なし',
    
    helpTitle: 'OpinionMap使用ガイド',
    helpDesc: '様々な意見を簡単に確認する方法',
    whatIsOpinionMap: '🎯 OpinionMapとは？',
    whatIsOpinionMapDesc: 'ニュース、YouTube、ブログから同じ問題についての様々な意見を自動収集し、「賛成」「反対」「代替案」などに整理します。すべての視点を一度に見られます！',
    howToUse1: '関心のあるトピックを探す',
    howToUse1Desc: 'ホーム画面で現在のトピックを確認するか、検索ボックスにキーワードを入力します。',
    howToUse2: '意見分布を確認',
    howToUse2Desc: 'バブルチャートで、円のサイズは関連記事数、色は意見傾向を表します。',
    howToUse3: '詳細な意見を探索',
    howToUse3Desc: '各バブルをクリックすると、その立場の主な主張と出典が確認できます。',
    howToUse4: 'トピックを比較',
    howToUse4Desc: '複数のトピックを同時に比較して世論の違いを分析できます。',
    chartGuide: '📊 チャート色ガイド',
    chartColors: '各色は意見の立場を表します',
    blueSupport: '青 = 賛成立場',
    redOppose: '赤 = 反対立場',
    greenAlternative: '緑 = 代替案提示',
    grayNeutral: '灰色 = 中立立場',
    
    language: '言語',
    korean: '한국어',
    english: 'English',
    chinese: '中文',
    japanese: '日本語',
    
    issueAnalysisSubtitle: 'AIがニュースを分析し、多様な意見を探します',
    issueAnalysisDesc: 'ニュース記事やブログのテキストを貼り付けるか、URLを入力してください。AIがインターネット上で賛成/反対/中立/代替意見を見つけて分析します。',
    inputText: 'テキスト入力',
    inputUrl: 'URL入力',
    pasteArticle: 'ニュース記事またはブログ記事を貼り付け',
    pasteArticlePlaceholder: 'ニュース記事またはブログ記事の全文をここに貼り付けてください...',
    enterUrl: 'ニュース/YouTube/ブログのURLを入力',
    enterUrlPlaceholder: 'https://example.com/news-article',
    analysisNote: '💡 AIが入力内容が適切なニュースや議題かを自動判断します。不適切な内容は除外されます。',
    analyzing: '分析中...',
    startAnalysis: '分析開始',
    extractedKeywords: '抽出されたキーワード',
    extractedKeywordsDesc: 'AIが抽出した議題の核心キーワード',
    foundOpinions: '{count}件の関連意見を見つけました',
    futurePrediction: '未来展望',
    futurePredictionDesc: 'AIが分析したこの議題による未来の変化予測',
  },
};
