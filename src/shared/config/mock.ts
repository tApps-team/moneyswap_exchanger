import { City, Country } from "@/entities/location";

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
    icon_valute_to: "https://api.moneyswap.online/media/icons/valute/CASHRUB.svg",
    is_active: true,
    in_count_type: "Криптовалюта",
    out_count_type: "Наличные",
    bankomats: [
      { id: 1, available: true, name: "Bank1", icon: "https://api.moneyswap.online/media/icons/bank/1.svg" },
      { id: 2, available: true, name: "Bank2", icon: "https://api.moneyswap.online/media/icons/bank/2.svg" }
    ],
    exchange_rates: [
      {
        min_count: 0,
        max_count: 500,
        in_count: 1,
        out_count: 90000,
        rate_coefficient: 1
      },
      {
        min_count: 500,
        max_count: 1000,
        in_count: 1,
        out_count: 95000,
        rate_coefficient: 1.056
      },
      {
        min_count: 1000,
        max_count: 5000,
        in_count: 1,
        out_count: 98000,
        rate_coefficient: 1.089
      },
      {
        min_count: 5000,
        max_count: null,
        in_count: 1,
        out_count: 100000,
        rate_coefficient: 1.111
      }
    ]
  },
  {
    id: 36,
    valute_from: "ETH",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/ETH.svg",
    valute_to: "CASHEUR",
    icon_valute_to: "https://api.moneyswap.online/media/icons/valute/CASHEUR.svg",
    is_active: true,
    in_count_type: "Криптовалюта",
    out_count_type: "Наличные",
    bankomats: [
      { id: 3, available: true, name: "Bank3", icon: "https://api.moneyswap.online/media/icons/bank/3.svg" }
    ],
    exchange_rates: [
      {
        min_count: 0,
        max_count: 500,
        in_count: 1,
        out_count: 1800,
        rate_coefficient: 1
      },
      {
        min_count: 500,
        max_count: 1000,
        in_count: 1,
        out_count: 1850,
        rate_coefficient: 1.028
      },
      {
        min_count: 1000,
        max_count: null,
        in_count: 1,
        out_count: 1900,
        rate_coefficient: 1.056
      }
    ]
  },
  {
    id: 37,
    valute_from: "LTC",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/LTC.svg",
    valute_to: "CASHUSD",
    icon_valute_to: "https://api.moneyswap.online/media/icons/valute/CASHUSD.svg",
    is_active: true,
    in_count_type: "Криптовалюта",
    out_count_type: "Наличные",
    bankomats: null,
    exchange_rates: [
      {
        min_count: 0,
        max_count: 500,
        in_count: 1,
        out_count: 75,
        rate_coefficient: 1
      },
      {
        min_count: 500,
        max_count: 1000,
        in_count: 1,
        out_count: 78,
        rate_coefficient: 1.04
      },
      {
        min_count: 1000,
        max_count: null,
        in_count: 1,
        out_count: 80,
        rate_coefficient: 1.067
      }
    ]
  },
  {
    id: 231,
    valute_from: "CASHRUB",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/CASHRUB.svg",
    valute_to: "CASHUSD",
    icon_valute_to: "https://api.moneyswap.online/media/icons/valute/CASHUSD.svg",
    is_active: true,
    in_count_type: "Наличные",
    out_count_type: "Наличные",
    bankomats: null,
    exchange_rates: [
      {
        min_count: 0,
        max_count: 500,
        in_count: 100,
        out_count: 1,
        rate_coefficient: 1
      },
      {
        min_count: 500,
        max_count: 1000,
        in_count: 98,
        out_count: 1,
        rate_coefficient: 1.02
      },
      {
        min_count: 1000,
        max_count: null,
        in_count: 95,
        out_count: 1,
        rate_coefficient: 1.053
      }
    ]
  },
  {
    id: 232,
    valute_from: "USDT",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/USDT.svg",
    valute_to: "CASHRUB",
    icon_valute_to: "https://api.moneyswap.online/media/icons/valute/CASHRUB.svg",
    is_active: true,
    in_count_type: "Криптовалюта",
    out_count_type: "Наличные",
    bankomats: null,
    exchange_rates: [
      {
        min_count: null,
        max_count: null,
        in_count: 1,
        out_count: 0.99,
        rate_coefficient: 0.99
      }
    ]
  },
  {
    id: 233,
    valute_from: "DOGE",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/DOGE.svg",
    valute_to: "CASHEUR",
    icon_valute_to: "https://api.moneyswap.online/media/icons/valute/CASHEUR.svg",
    is_active: true,
    in_count_type: "Криптовалюта",
    out_count_type: "Наличные",
    bankomats: [
      { id: 4, available: true, name: "Bank4", icon: "https://api.moneyswap.online/media/icons/bank/4.svg" }
    ],
    exchange_rates: [
      {
        min_count: null,
        max_count: null,
        in_count: 1,
        out_count: 1.02,
        rate_coefficient: 1.02
      }
    ]
  },
  {
    id: 234,
    valute_from: "CASHUSD",
    icon_valute_from: "https://api.moneyswap.online/media/icons/valute/CASHUSD.svg",
    valute_to: "CASHEUR",
    icon_valute_to: "https://api.moneyswap.online/media/icons/valute/CASHEUR.svg",
    is_active: true,
    in_count_type: "Наличные",
    out_count_type: "Наличные",
    bankomats: null,
    exchange_rates: [
      {
        min_count: null,
        max_count: null,
        in_count: 1,
        out_count: 0.95,
        rate_coefficient: 0.95
      }
    ]
  }
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
