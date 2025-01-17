import { CurrencyResponse } from "@/entities/direction";
import { City, Country } from "@/entities/location";
import { CurrencyType } from "../types";

export const mock_mycities = [
  {
    id: 38,
    name: { ru: "Голд-Кост", en: "Gold-Coast" },
    code_name: "GCST",
    country: { ru: "Австралия", en: "Australia" },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/australia.svg",
    info: {
      delivery: false,
      office: false,
      working_days: {
        ПН: true,
        ВТ: true,
        СР: true,
        ЧТ: true,
        ПТ: true,
        СБ: true,
        ВС: false,
      },
      weekdays: { time_from: "10:00", time_to: "22:00" },
      weekends: { time_from: "11:00", time_to: "19:00" },
    },
    updated: {
      date: "22.10.2024",
      time: "19:49",
    },
  },
  {
    id: 39,
    name: { ru: "Москва", en: "Moscow" },
    code_name: "MSK",
    country: { ru: "Россия", en: "Russia" },
    country_flag: "https://api.moneyswap.online/media/icons/country/russia.svg",
    info: {
      delivery: true,
      office: true,
      working_days: {
        ПН: true,
        ВТ: true,
        СР: true,
        ЧТ: true,
        ПТ: true,
        СБ: true,
        ВС: false,
      },
      weekdays: { time_from: "09:00", time_to: "20:00" },
      weekends: { time_from: "12:00", time_to: "18:00" },
    },
    updated: {
      date: null,
      time: null,
    },
  },
];

export const mock_mydirections = [
  {
    id: 35,
    valute_from: "BTC",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/BTC.svg",
    valute_to: "CASHRUB",
    icon_valute_to:
      "https://api.moneyswap.online/media/icons/valute/CASHRUB.svg",
    in_count: 1,
    in_count_type: "Криптовалюта",
    out_count: 6512779.99,
    out_count_type: "Наличные",
    is_active: true,
  },
  {
    id: 36,
    valute_from: "ETH",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/ETH.svg",
    valute_to: "CASHEUR",
    icon_valute_to:
      "https://api.moneyswap.online/media/icons/valute/CASHEUR.svg",
    in_count: 1,
    in_count_type: "Криптовалюта",
    out_count: 2441.62,
    out_count_type: "Наличные",
    is_active: true,
  },
  {
    id: 37,
    valute_from: "LTC",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/LTC.svg",
    valute_to: "CASHUSD",
    icon_valute_to:
      "https://api.moneyswap.online/media/icons/valute/CASHUSD.svg",
    in_count: 1,
    in_count_type: "Криптовалюта",
    out_count: 70.2,
    out_count_type: "Наличные",
    is_active: true,
  },
  {
    id: 231,
    valute_from: "CASHRUB",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/LTC.svg",
    valute_to: "CASHUSD",
    icon_valute_to:
      "https://api.moneyswap.online/media/icons/valute/CASHUSD.svg",
    in_count: 1,
    in_count_type: "Наличные",
    out_count: 70.2,
    out_count_type: "Наличные",
    is_active: true,
  },
];

export const mock_countires: Country[] = [
  {
    id: 70,
    name: {
      ru: "Австралия",
      en: "Australia",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/australia.svg",
  },
  {
    id: 104,
    name: {
      ru: "Австрия",
      en: "Austria",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/austria_ILSxGjV.svg",
  },
  {
    id: 27,
    name: {
      ru: "Азербайджан",
      en: "Azerbaijan",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/azerbaijan.svg",
  },
  {
    id: 78,
    name: {
      ru: "Албания",
      en: "Albania",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/albania.svg",
  },
  {
    id: 53,
    name: {
      ru: "Алжир",
      en: "Algeria",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/algeria.svg",
  },
  {
    id: 52,
    name: {
      ru: "Ангола",
      en: "Angola",
    },
    country_flag: "https://api.moneyswap.online/media/icons/country/angola.svg",
  },
  {
    id: 103,
    name: {
      ru: "Аргентина",
      en: "Argentina",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/argentina.svg",
  },
  {
    id: 99,
    name: {
      ru: "Армения",
      en: "Armenia",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/armenia.svg",
  },
  {
    id: 38,
    name: {
      ru: "Бахрейн",
      en: "Bahrain",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/bahrain.svg",
  },
  {
    id: 9,
    name: {
      ru: "Беларусь",
      en: "Belarus",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/Belarus.svg",
  },
  {
    id: 73,
    name: {
      ru: "Бельгия",
      en: "Belgium",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/Belgium.svg",
  },
  {
    id: 14,
    name: {
      ru: "Бенин",
      en: "Benin",
    },
    country_flag: "https://api.moneyswap.online/media/icons/country/Benin.svg",
  },
  {
    id: 33,
    name: {
      ru: "Болгария",
      en: "Bulgaria",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/Bulgaria.svg",
  },
  {
    id: 89,
    name: {
      ru: "Бразилия",
      en: "Brazil",
    },
    country_flag: "https://api.moneyswap.online/media/icons/country/Brazil.svg",
  },
  {
    id: 66,
    name: {
      ru: "Буркина Фасо",
      en: "Burkina Faso",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/Burkina_Faso.svg",
  },
  {
    id: 76,
    name: {
      ru: "Великобритания",
      en: "United Kingdom",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/United_Kingdom.svg",
  },
  {
    id: 92,
    name: {
      ru: "Венгрия",
      en: "Hungary",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/Hungary.svg",
  },
  {
    id: 45,
    name: {
      ru: "Габон",
      en: "Gabon",
    },
    country_flag: "https://api.moneyswap.online/media/icons/country/Gabon.svg",
  },
  {
    id: 94,
    name: {
      ru: "Гамбия",
      en: "Gambia",
    },
    country_flag: "https://api.moneyswap.online/media/icons/country/Gambia.svg",
  },
  {
    id: 82,
    name: {
      ru: "Гана",
      en: "Ghana",
    },
    country_flag: "https://api.moneyswap.online/media/icons/country/Ghana.svg",
  },
  {
    id: 41,
    name: {
      ru: "Гвинея",
      en: "Guinea",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/Guinea_ziRDDCe.svg",
  },
  {
    id: 22,
    name: {
      ru: "Гвинея-Бисау",
      en: "Guinea-Bissau",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/Guinea-Bissau.svg",
  },
  {
    id: 35,
    name: {
      ru: "Германия",
      en: "Germany",
    },
    country_flag:
      "https://api.moneyswap.online/media/icons/country/Germany.svg",
  },
  {
    id: 32,
    name: {
      ru: "Греция",
      en: "Greece",
    },
    country_flag: "https://api.moneyswap.online/media/icons/country/Greece.svg",
  },
];

export const mock_cities: City[] = [
  {
    id: 7,
    name: {
      ru: "Адлер",
      en: "Adler",
    },
    code_name: "ADLER",
  },
  {
    id: 16,
    name: {
      ru: "Анапа",
      en: "Anapa",
    },
    code_name: "ANAPA",
  },
  {
    id: 22,
    name: {
      ru: "Архангельск",
      en: "Arkhangelsk",
    },
    code_name: "ARKH",
  },
  {
    id: 25,
    name: {
      ru: "Астрахань",
      en: "Astrakhan",
    },
    code_name: "ASTRA",
  },
  {
    id: 35,
    name: {
      ru: "Барнаул",
      en: "Barnaul",
    },
    code_name: "BRNL",
  },
  {
    id: 41,
    name: {
      ru: "Белгород",
      en: "Belgorod",
    },
    code_name: "BLGR",
  },
  {
    id: 63,
    name: {
      ru: "Брянск",
      en: "Bryansk",
    },
    code_name: "BRN",
  },
  {
    id: 79,
    name: {
      ru: "Владивосток",
      en: "Vladivostok",
    },
    code_name: "VVO",
  },
  {
    id: 80,
    name: {
      ru: "Владимир",
      en: "Vladimir",
    },
    code_name: "VLAD",
  },
  {
    id: 81,
    name: {
      ru: "Волгоград",
      en: "Volgograd",
    },
    code_name: "VLGD",
  },
  {
    id: 82,
    name: {
      ru: "Воронеж",
      en: "Voronezh",
    },
    code_name: "VORON",
  },
  {
    id: 88,
    name: {
      ru: "Геленджик",
      en: "Gelendzhik",
    },
    code_name: "GLND",
  },
  {
    id: 93,
    name: {
      ru: "Грозный",
      en: "Grozny",
    },
    code_name: "GRZ",
  },
  {
    id: 113,
    name: {
      ru: "Екатеринбург",
      en: "Yekaterinburg",
    },
    code_name: "EKB",
  },
  {
    id: 114,
    name: {
      ru: "Елец",
      en: "Yelets",
    },
    code_name: "YLTS",
  },
  {
    id: 123,
    name: {
      ru: "Ижевск",
      en: "Izhevsk",
    },
    code_name: "IZHV",
  },
  {
    id: 126,
    name: {
      ru: "Иркутск",
      en: "Irkutsk",
    },
    code_name: "IRK",
  },
  {
    id: 129,
    name: {
      ru: "Йошкар-Ола",
      en: "Yoshkar-Ola",
    },
    code_name: "YOLA",
  },
  {
    id: 130,
    name: {
      ru: "Казань",
      en: "Kazan",
    },
    code_name: "KZN",
  },
  {
    id: 133,
    name: {
      ru: "Калининград",
      en: "Kaliningrad",
    },
    code_name: "KLNG",
  },
  {
    id: 134,
    name: {
      ru: "Калуга",
      en: "Kaluga",
    },
    code_name: "KLG",
  },
  {
    id: 150,
    name: {
      ru: "Кемерово",
      en: "Kemerovo",
    },
    code_name: "KEM",
  },
  {
    id: 155,
    name: {
      ru: "Киров",
      en: "Kirov",
    },
    code_name: "KIROV",
  },
  {
    id: 163,
    name: {
      ru: "Кострома",
      en: "Kostroma",
    },
    code_name: "KOST",
  },
  {
    id: 169,
    name: {
      ru: "Краснодар",
      en: "Krasnodar",
    },
    code_name: "KRASN",
  },
  {
    id: 170,
    name: {
      ru: "Красноярск",
      en: "Krasnoyarsk",
    },
    code_name: "KRSK",
  },
  {
    id: 176,
    name: {
      ru: "Курск",
      en: "Kursk",
    },
    code_name: "KURSK",
  },
  {
    id: 186,
    name: {
      ru: "Липецк",
      en: "Lipetsk",
    },
    code_name: "LPT",
  },
  {
    id: 202,
    name: {
      ru: "Магнитогорск",
      en: "Magnitogorsk",
    },
    code_name: "MGNT",
  },
  {
    id: 217,
    name: {
      ru: "Махачкала",
      en: "Makhachkala",
    },
    code_name: "MHKL",
  },
  {
    id: 233,
    name: {
      ru: "Москва",
      en: "Moscow",
    },
    code_name: "MSK",
  },
  {
    id: 236,
    name: {
      ru: "Мурманск",
      en: "Murmansk",
    },
    code_name: "MRMK",
  },
  {
    id: 239,
    name: {
      ru: "Набережные Челны",
      en: "Naberezhnye Chelny",
    },
    code_name: "NABCH",
  },
  {
    id: 246,
    name: {
      ru: "Нижний Новгород",
      en: "Nizhny Novgorod",
    },
    code_name: "NNOV",
  },
  {
    id: 253,
    name: {
      ru: "Новокузнецк",
      en: "Novokuznetsk",
    },
    code_name: "NVKZN",
  },
  {
    id: 254,
    name: {
      ru: "Новороссийск",
      en: "Novorossiysk",
    },
    code_name: "NOVOR",
  },
  {
    id: 255,
    name: {
      ru: "Новосибирск",
      en: "Novosibirsk",
    },
    code_name: "NSK",
  },
  {
    id: 262,
    name: {
      ru: "Омск",
      en: "Omsk",
    },
    code_name: "OMSK",
  },
  {
    id: 264,
    name: {
      ru: "Орел",
      en: "Oryol",
    },
    code_name: "ORYOL",
  },
  {
    id: 265,
    name: {
      ru: "Оренбург",
      en: "Orenburg",
    },
    code_name: "OREN",
  },
  {
    id: 277,
    name: {
      ru: "Пенза",
      en: "Penza",
    },
    code_name: "PENZA",
  },
  {
    id: 278,
    name: {
      ru: "Пермь",
      en: "Perm",
    },
    code_name: "PERM",
  },
  {
    id: 279,
    name: {
      ru: "Петрозаводск",
      en: "Petrozavodsk",
    },
    code_name: "PTRS",
  },
];

// export const mock_all_currencies: CurrencyResponse = {
//   Криптовалюта: [
//     {
//       id: 1,
//       name: { ru: "Биткоин", en: "Bitcoin" },
//       code_name: "BTC",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/BTC.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 18,
//       name: { ru: "Эфириум", en: "Ethereum" },
//       code_name: "ETH",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/ETH.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 19,
//       name: { ru: "Лайткоин", en: "Litecoin" },
//       code_name: "LTC",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/LTC.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 20,
//       name: { ru: "Солана", en: "Solana" },
//       code_name: "SOL",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/SOL_LohzSyk.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 21,
//       name: { ru: "ТРОН", en: "TRON" },
//       code_name: "TRX",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/TRX_DkFRBv9.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 22,
//       name: { ru: "Тезер BEP20 USDT", en: "Tether BEP20 USDT" },
//       code_name: "USDTBEP20",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/USDTBEP20.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 23,
//       name: { ru: "Тезер ERC20 USDT", en: "Tether ERC20 USDT" },
//       code_name: "USDTERC20",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/USDTERC20.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 24,
//       name: { ru: "Тезер TRC20 USDT", en: "Tether TRC20 USDT" },
//       code_name: "USDTTRC20",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/USDTTRC20.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//   ],
//   Наличные: [
//     {
//       id: 2,
//       name: { ru: "Дирхам", en: "Dirham" },
//       code_name: "CASHAED",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/CASHAED_IlnL5J0.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 3,
//       name: { ru: "Армянский драм", en: "Armenian Dram" },
//       code_name: "CASHAMD",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/dram_9rssp302m455.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 4,
//       name: { ru: "Аргентинское песо", en: "Argentine Peso" },
//       code_name: "CASHARS",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/arg_peso_YYAWjuL.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 5,
//       name: { ru: "Канадский доллар", en: "Canadian Dollar" },
//       code_name: "CASHCAD",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/canada_doll.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 6,
//       name: { ru: "Евро", en: "Euro" },
//       code_name: "CASHEUR",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/CASHEUR.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 7,
//       name: { ru: "Фунт стерлингов", en: "Pound Sterling" },
//       code_name: "CASHGBP",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/pound.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 8,
//       name: { ru: "Грузинский лари", en: "Georgian Lari" },
//       code_name: "CASHGEL",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/gruz_lari.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 9,
//       name: { ru: "Индонезийская Рупия", en: "Indonesian Rupiah" },
//       code_name: "CASHIDR",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/indonesian_rupia.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 10,
//       name: { ru: "Израельский Шекель", en: "Israeli Shekel" },
//       code_name: "CASHILS",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/shekel_1iv1afdwk20o.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 11,
//       name: { ru: "Тенге", en: "Tenge" },
//       code_name: "CASHKZT",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/CASHKZT_saW9di0.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 12,
//       name: { ru: "Польский Злотый", en: "Polish Zloty" },
//       code_name: "CASHPLN",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/CASHPLN_1Upett6.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 13,
//       name: { ru: "Рубли", en: "Rubles" },
//       code_name: "CASHRUB",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/CASHRUB.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 14,
//       name: { ru: "Тайский бат", en: "Thai Baht" },
//       code_name: "CASHTHB",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/CASHTHB.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 15,
//       name: { ru: "Турецкая лира", en: "Turkish Lira" },
//       code_name: "CASHTRY",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/lira.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 16,
//       name: { ru: "Украинская гривна", en: "Ukrainian Hryvnia" },
//       code_name: "CASHUAH",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/grivna_BhtuQoR.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 17,
//       name: { ru: "Доллары", en: "Dollars" },
//       code_name: "CASHUSD",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/CASHUSD.svg",
//       type_valute: CurrencyType.Cash,
//     },
//   ],
// };

// export const mock_available_currencies: CurrencyCategory = {
//   Криптовалюта: [
//     {
//       id: 1,
//       name: { ru: "Биткоин", en: "Bitcoin" },
//       code_name: "BTC",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/BTC.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 18,
//       name: { ru: "Эфириум", en: "Ethereum" },
//       code_name: "ETH",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/ETH.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 19,
//       name: { ru: "Лайткоин", en: "Litecoin" },
//       code_name: "LTC",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/LTC.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 20,
//       name: { ru: "Солана", en: "Solana" },
//       code_name: "SOL",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/SOL_LohzSyk.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 21,
//       name: { ru: "ТРОН", en: "TRON" },
//       code_name: "TRX",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/TRX_DkFRBv9.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 22,
//       name: { ru: "Тезер BEP20 USDT", en: "Tether BEP20 USDT" },
//       code_name: "USDTBEP20",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/USDTBEP20.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 23,
//       name: { ru: "Тезер ERC20 USDT", en: "Tether ERC20 USDT" },
//       code_name: "USDTERC20",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/USDTERC20.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//     {
//       id: 24,
//       name: { ru: "Тезер TRC20 USDT", en: "Tether TRC20 USDT" },
//       code_name: "USDTTRC20",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/USDTTRC20.svg",
//       type_valute: CurrencyType.Cryptocurrency,
//     },
//   ],
//   Наличные: [
//     {
//       id: 2,
//       name: { ru: "Дирхам", en: "Dirham" },
//       code_name: "CASHAED",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/CASHAED_IlnL5J0.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 3,
//       name: { ru: "Армянский драм", en: "Armenian Dram" },
//       code_name: "CASHAMD",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/dram_9rssp302m455.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 4,
//       name: { ru: "Аргентинское песо", en: "Argentine Peso" },
//       code_name: "CASHARS",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/arg_peso_YYAWjuL.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 5,
//       name: { ru: "Канадский доллар", en: "Canadian Dollar" },
//       code_name: "CASHCAD",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/canada_doll.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 6,
//       name: { ru: "Евро", en: "Euro" },
//       code_name: "CASHEUR",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/CASHEUR.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 7,
//       name: { ru: "Фунт стерлингов", en: "Pound Sterling" },
//       code_name: "CASHGBP",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/pound.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 8,
//       name: { ru: "Грузинский лари", en: "Georgian Lari" },
//       code_name: "CASHGEL",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/gruz_lari.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 9,
//       name: { ru: "Индонезийская Рупия", en: "Indonesian Rupiah" },
//       code_name: "CASHIDR",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/indonesian_rupia.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 10,
//       name: { ru: "Израельский Шекель", en: "Israeli Shekel" },
//       code_name: "CASHILS",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/shekel_1iv1afdwk20o.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 11,
//       name: { ru: "Тенге", en: "Tenge" },
//       code_name: "CASHKZT",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/CASHKZT_saW9di0.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 12,
//       name: { ru: "Польский Злотый", en: "Polish Zloty" },
//       code_name: "CASHPLN",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/CASHPLN_1Upett6.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 13,
//       name: { ru: "Рубли", en: "Rubles" },
//       code_name: "CASHRUB",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/CASHRUB.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 14,
//       name: { ru: "Тайский бат", en: "Thai Baht" },
//       code_name: "CASHTHB",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/CASHTHB.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 15,
//       name: { ru: "Турецкая лира", en: "Turkish Lira" },
//       code_name: "CASHTRY",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/lira.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 16,
//       name: { ru: "Украинская гривна", en: "Ukrainian Hryvnia" },
//       code_name: "CASHUAH",
//       icon_url:
//         "https://api.moneyswap.online/media/icons/valute/grivna_BhtuQoR.svg",
//       type_valute: CurrencyType.Cash,
//     },
//     {
//       id: 17,
//       name: { ru: "Доллары", en: "Dollars" },
//       code_name: "CASHUSD",
//       icon_url: "https://api.moneyswap.online/media/icons/valute/CASHUSD.svg",
//       type_valute: CurrencyType.Cash,
//     },
//   ],
// };
