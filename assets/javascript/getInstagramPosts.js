/* Implementation currently uses Mock Data from API to avoid using up views */
async function getInstagramPosts() {
  let data = localStorage.getItem("instagramResponse");
  const photoContainer = $("#photoContainer");
  photoContainer.empty();
  try {
    if (!data) {
      //const response = await fetch('FETCH URL');
      if (true /*response.ok*/) {
        data = JSON.stringify({
          username: "trickfirerobotics",
          profilePictureUrl:
            "https://cdn2.behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/26520834927530895/profile.webp",
          website: "https://trickfirerobotics.org/join_us",
          followersCount: 122,
          followsCount: 68,
          posts: [
            {
              id: "18051994516870087",
              timestamp: "2024-09-05T23:59:43+0000",
              permalink: "https://www.instagram.com/p/C_jgYtLSTEY/",
              mediaType: "CAROUSEL_ALBUM",
              mediaUrl:
                "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/458426186_850010327108317_3389982402340127854_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=18de74&_nc_ohc=XybTfwdJhM4Q7kNvgETzubx&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYA8sGclbYPtplgMKLcYLYlUhiXAkOvVH6Io4bZIMhS2Qw&oe=66E173AD",
              sizes: {
                small: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18051994516870087/small.webp",
                  height: 267,
                  width: 400,
                },
                medium: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18051994516870087/medium.webp",
                  height: 467,
                  width: 700,
                },
                large: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18051994516870087/large.webp",
                  height: 667,
                  width: 1000,
                },
                full: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18051994516870087/full.webp",
                  height: 960,
                  width: 1440,
                },
              },
              caption:
                "We’ve been having a busy summer and can’t wait to see you all when fall quarter starts😁 Here’s a little photo recap of our activities and tests.",
              prunedCaption:
                "We’ve been having a busy summer and can’t wait to see you all when fall quarter starts😁 Here’s a little photo recap of our activities and tests.",
              hashtags: [],
              mentions: [],
              colorPalette: {
                dominant: "34,36,32",
                muted: "116,127,120",
                mutedLight: "196,196,193",
                mutedDark: "56,74,100",
                vibrant: "54,115,182",
                vibrantLight: "152,187,224",
                vibrantDark: "13,4,6",
              },
              children: [
                {
                  id: "18309796087089330",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/458426186_850010327108317_3389982402340127854_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=18de74&_nc_ohc=XybTfwdJhM4Q7kNvgETzubx&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYA8sGclbYPtplgMKLcYLYlUhiXAkOvVH6Io4bZIMhS2Qw&oe=66E173AD",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18309796087089330/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18309796087089330/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18309796087089330/large.webp",
                      height: 667,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18309796087089330/full.webp",
                      height: 960,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "34,36,32",
                    muted: "116,127,120",
                    mutedLight: "196,196,193",
                    mutedDark: "56,74,100",
                    vibrant: "54,115,182",
                    vibrantLight: "152,187,224",
                    vibrantDark: "13,4,6",
                  },
                },
                {
                  id: "18057705085684209",
                  mediaType: "VIDEO",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/o1/v/t16/f2/m69/An-H3y6kqrhFI4xYFPSZbHzH3fnXcZBy1auPZ_qwyBtnVUs9U9AYk7YvxYmf9nzbU_izi2BxpuWqPvpjF4jxEj0.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0FST1VTRUxfSVRFTS5DMy43MjAuZGFzaF9iYXNlbGluZV8xX3YxIn0&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=107&strext=1&vs=214f52b70e3cf596&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HTGxpV0J0VFFyMUtvYm9EQU9HelVTak5QeFJyYmtZTEFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dESXFVQnZrbTlTdGdMc0RBTVhlR09qSEdqSVhia1lMQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJu6H0s2R8JYEFQIoAkMzLBdANZqfvnbItBgSZGFzaF9iYXNlbGluZV8xX3YxEQB17gcA&ccb=9-4&oh=00_AYBEdXrZPqhFDZGwSi4jiYd2v_NCpdFy5qtvlRsiGe5fgg&oe=66DD7902&_nc_sid=1d576d",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18057705085684209/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18057705085684209/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18057705085684209/large.webp",
                      height: 480,
                      width: 720,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18057705085684209/full.webp",
                      height: 480,
                      width: 720,
                    },
                  },
                  colorPalette: {
                    dominant: "172,190,205",
                    muted: "160,89,110",
                    mutedLight: "171,187,198",
                    mutedDark: "51,65,85",
                    vibrant: "72,134,189",
                    vibrantLight: "172,204,239",
                    vibrantDark: "36,58,132",
                  },
                },
                {
                  id: "18019959269396772",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/458741136_1047312577043036_1642743671238366024_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=EE6PqAE48VIQ7kNvgHqxIbz&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYCsg70mHFIaFpUiA4NZLhNouerzt3icmfEYtz8Nf0czVw&oe=66E14269",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18019959269396772/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18019959269396772/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18019959269396772/large.webp",
                      height: 667,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18019959269396772/full.webp",
                      height: 960,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "204,195,178",
                    muted: "149,134,120",
                    mutedLight: "208,196,169",
                    mutedDark: "67,56,42",
                    vibrant: "208,56,48",
                    vibrantLight: "225,239,166",
                    vibrantDark: "108,28,24",
                  },
                },
                {
                  id: "18045896152782060",
                  mediaType: "VIDEO",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/o1/v/t16/f2/m69/An-cdsb9e1_vLZgjlLidM-yQkkBg5TXOMXuLZFl2igp-Th9zfu80lZpZCvsyLzGvFiq6jqR0bisKY5pI2JPd-jrl.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0FST1VTRUxfSVRFTS5DMy43MjAuZGFzaF9iYXNlbGluZV8xX3YxIn0&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=105&strext=1&vs=9bb6c991c0862f8c&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HUE42VmhzeFluLVdKd29IQUlxdTRyWVJMTnhYYmtZTEFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dGNG5UeHRYOVRkZ3ZHQUVBSzJoblhiclc5NU9ia1lMQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJqj09tLV0-8DFQIoAkMzLBdAJ4IMSbpeNRgSZGFzaF9iYXNlbGluZV8xX3YxEQB17gcA&ccb=9-4&oh=00_AYBmIFGWj_N9H0GzK0JUUv0WBLFZh5NUiVrEc7GQNZagqA&oe=66DD57C6&_nc_sid=1d576d",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18045896152782060/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18045896152782060/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18045896152782060/large.webp",
                      height: 480,
                      width: 720,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18045896152782060/full.webp",
                      height: 480,
                      width: 720,
                    },
                  },
                  colorPalette: {
                    dominant: "87,90,91",
                    muted: "156,122,82",
                    mutedLight: "167,186,188",
                    mutedDark: "52,79,81",
                    vibrant: "195,161,62",
                    vibrantLight: "220,206,179",
                    vibrantDark: "20,61,144",
                  },
                },
                {
                  id: "18013773950546433",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/458404365_1063608398440414_4662600720943077485_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=MM8IwLmZ3j0Q7kNvgFQnfzT&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYBkgikQoRCG0KnL974ksf6gLmUrdycX5T_ThSaMsc30Iw&oe=66E160BB",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18013773950546433/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18013773950546433/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18013773950546433/large.webp",
                      height: 667,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18013773950546433/full.webp",
                      height: 960,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "183,184,186",
                    muted: "180,113,102",
                    mutedLight: "186,187,199",
                    mutedDark: "49,76,56",
                    vibrant: "252,92,36",
                    vibrantLight: "71,227,55",
                    vibrantDark: "10,15,24",
                  },
                },
                {
                  id: "17979753419731793",
                  mediaType: "VIDEO",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/o1/v/t16/f2/m69/An_n1q-YH1_YzjVi_ycF-puezhFD4r8R_2H4M-Eq7wsNWV9xkaCQ-6HR8tL4S0eGb6FIO8EJZbJ2oi-AkhIkI4A.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0FST1VTRUxfSVRFTS5DMy4xNjIwLmRhc2hfYmFzZWxpbmVfMTA4MHBfdjEifQ&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=106&strext=1&vs=159738ce574bd40f&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HTHo5T3dmZEpVTHMxaXNLQUprclM5SVAwOGhUYnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dFYVBWaHVqZmhKaTVkQUJBTm80MVc0emNTbG5ia1lMQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJsiA_sHAotcDFQIoAkMzLBdAN0p--dsi0RgWZGFzaF9iYXNlbGluZV8xMDgwcF92MREAde4HAA&ccb=9-4&oh=00_AYARo2qJ0jnVzq8TdAnmIZ4H0W5qTbZdgcpiJzwykWhAVw&oe=66DD8079&_nc_sid=1d576d",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17979753419731793/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17979753419731793/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17979753419731793/large.webp",
                      height: 667,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17979753419731793/full.webp",
                      height: 1080,
                      width: 1620,
                    },
                  },
                  colorPalette: {
                    dominant: "141,138,138",
                    muted: "128,127,130",
                    mutedLight: "181,196,193",
                    mutedDark: "46,73,80",
                    vibrant: "210,144,67",
                    vibrantLight: "208,168,124",
                    vibrantDark: "34,52,77",
                  },
                },
                {
                  id: "18051812749712982",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/458471803_3803270979950360_621756888234502874_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=HTRJvgoTka0Q7kNvgFPdqgi&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYA-LyqXGhCYND8cYZ_qouOyFoNl9whZ2E-Q9_r_wbuyFg&oe=66E14CC7",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18051812749712982/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18051812749712982/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18051812749712982/large.webp",
                      height: 667,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18051812749712982/full.webp",
                      height: 960,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "77,76,75",
                    muted: "113,137,142",
                    mutedLight: "196,188,156",
                    mutedDark: "79,70,64",
                    vibrant: "205,51,37",
                    vibrantLight: "140,190,215",
                    vibrantDark: "22,68,114",
                  },
                },
                {
                  id: "18072003364505389",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/458310230_490852066908660_1306557947771428774_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=18de74&_nc_ohc=i7Csz1d2c10Q7kNvgGoy374&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYAfH1DIGHKUbsWOu9FOLpUODQQDp3A2TuI7mM3xa7EXOA&oe=66E16CB5",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18072003364505389/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18072003364505389/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18072003364505389/large.webp",
                      height: 667,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18072003364505389/full.webp",
                      height: 960,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "152,154,148",
                    muted: "119,140,159",
                    mutedLight: "208,198,169",
                    mutedDark: "76,46,47",
                    vibrant: "42,96,158",
                    vibrantLight: "159,193,217",
                    vibrantDark: "12,65,118",
                  },
                },
                {
                  id: "18127563919371592",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/458486606_494504636527646_3575065857547713861_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=18de74&_nc_ohc=8Ux2LBPJC74Q7kNvgHDIO0s&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYAK7WafuwAQRFCnOObuaxE2fOlvGXt3dKtbWQD-dR_mTg&oe=66E14630",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18127563919371592/small.webp",
                      height: 266,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18127563919371592/medium.webp",
                      height: 466,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18127563919371592/large.webp",
                      height: 666,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18127563919371592/full.webp",
                      height: 959,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "146,150,155",
                    muted: "114,119,131",
                    mutedLight: "184,194,205",
                    mutedDark: "76,49,41",
                    vibrant: "55,151,117",
                    vibrantLight: "157,210,194",
                    vibrantDark: "46,100,86",
                  },
                },
                {
                  id: "18368040157111224",
                  mediaType: "VIDEO",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/o1/v/t16/f2/m69/An9rt64fuDCuqvf6X4CmbWdml1CBzb_jXLXQlOLvREgpDP0dXD2hRw5mNbKskDdJ0UulqJtaoQ6IaTGH3cDA2_E.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0FST1VTRUxfSVRFTS5DMy4xNjIwLmRhc2hfYmFzZWxpbmVfMTA4MHBfdjEifQ&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=109&strext=1&vs=65dc953cefa3fa2a&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HTkNVbmdKSG10bFU4bVlGQU5POExhZmM5RVF6YnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dBYlRSQnRMcGRsNlo1TUJBQXVzS3paSmlzeG1ia1lMQUFBRhUCAsgBACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2lwZQExFQAAJt6yp_GAouABFQIoAkMzLBdARuqfvnbItBgWZGFzaF9iYXNlbGluZV8xMDgwcF92MREAde4HAA&ccb=9-4&oh=00_AYA3yrlfCyGYWbYShFGq1tBtj7aboxR2uXQIEi8kMxuGtQ&oe=66DD774C&_nc_sid=1d576d",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18368040157111224/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18368040157111224/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18368040157111224/large.webp",
                      height: 667,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18368040157111224/full.webp",
                      height: 1080,
                      width: 1620,
                    },
                  },
                  colorPalette: {
                    dominant: "132,128,130",
                    muted: "100,117,148",
                    mutedLight: "209,207,190",
                    mutedDark: "80,55,43",
                    vibrant: "188,132,75",
                    vibrantLight: "215,174,116",
                    vibrantDark: "80,52,20",
                  },
                },
                {
                  id: "17889440181015803",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/458412221_502558172721130_6925106956190229340_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=18de74&_nc_ohc=RgtqN5G85ToQ7kNvgFAZI8h&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYCK_M7WS_ChtXESdzACYjsDEbma_GN2bpqICf4A7p0PUg&oe=66E17004",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17889440181015803/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17889440181015803/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17889440181015803/large.webp",
                      height: 667,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17889440181015803/full.webp",
                      height: 960,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "184,189,167",
                    muted: "84,128,160",
                    mutedLight: "178,185,176",
                    mutedDark: "78,61,52",
                    vibrant: "44,148,188",
                    vibrantLight: "132,220,250",
                    vibrantDark: "103,44,28",
                  },
                },
                {
                  id: "18246986725256539",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/458398397_8110771445675208_8708538044504787175_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=18de74&_nc_ohc=xgl_erAlNWwQ7kNvgFPCcfK&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYAIKnzBulolwpXZvzEBdg5s-JGeIYTYhKu14bQFXZoCDA&oe=66E15749",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18246986725256539/small.webp",
                      height: 267,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18246986725256539/medium.webp",
                      height: 467,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18246986725256539/large.webp",
                      height: 667,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18246986725256539/full.webp",
                      height: 960,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "202,201,202",
                    muted: "141,116,110",
                    mutedLight: "202,190,178",
                    mutedDark: "54,66,90",
                    vibrant: "44,140,228",
                    vibrantLight: "189,218,246",
                    vibrantDark: "32,41,70",
                  },
                },
              ],
            },
            {
              id: "18034283623812388",
              timestamp: "2024-05-25T03:59:25+0000",
              permalink: "https://www.instagram.com/p/C7YJJW-NyIv/",
              mediaType: "IMAGE",
              mediaUrl:
                "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/443733578_804775854636554_4313635853820183841_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=3y0XsUKz3ooQ7kNvgH-kjMF&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYDgbM2-iV1227ypLsWJtVv46x6D54k0OemyHK0X4O5Z0w&oe=66E1635B",
              sizes: {
                small: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18034283623812388/small.webp",
                  height: 266,
                  width: 400,
                },
                medium: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18034283623812388/medium.webp",
                  height: 466,
                  width: 700,
                },
                large: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18034283623812388/large.webp",
                  height: 666,
                  width: 1000,
                },
                full: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18034283623812388/full.webp",
                  height: 903,
                  width: 1356,
                },
              },
              caption: "Thanks everyone for showing up to our rover unveil!",
              prunedCaption:
                "Thanks everyone for showing up to our rover unveil!",
              hashtags: [],
              mentions: [],
              colorPalette: {
                dominant: "216,217,213",
                muted: "149,105,86",
                mutedLight: "207,179,177",
                mutedDark: "76,59,41",
                vibrant: "160,56,72",
                vibrantLight: "188,100,132",
                vibrantDark: "84,44,20",
              },
            },
            {
              id: "18038505046889912",
              timestamp: "2024-05-19T20:20:56+0000",
              permalink: "https://www.instagram.com/p/C7Kcs6wSY-6/",
              mediaType: "IMAGE",
              mediaUrl:
                "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/445140956_1018390616545004_4326244164941301427_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=18de74&_nc_ohc=G-M2uz_JOFQQ7kNvgF0TK7d&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYDs7N--86DEQTMtq4WYtROp8qHguxq1bXxSnb-SnliotQ&oe=66E15C39",
              sizes: {
                small: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18038505046889912/small.webp",
                  height: 400,
                  width: 400,
                },
                medium: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18038505046889912/medium.webp",
                  height: 700,
                  width: 700,
                },
                large: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18038505046889912/large.webp",
                  height: 1000,
                  width: 1000,
                },
                full: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18038505046889912/full.webp",
                  height: 2000,
                  width: 2000,
                },
              },
              caption:
                "Hi everyone,\n\nWe’re going to unveil our rover and we want you there!",
              prunedCaption:
                "Hi everyone,\n\nWe’re going to unveil our rover and we want you there!",
              hashtags: [],
              mentions: [],
              colorPalette: {
                dominant: "172,111,72",
                muted: "179,123,100",
                mutedLight: "182,220,186",
                mutedDark: "97,66,44",
                vibrant: "250,208,11",
                vibrantLight: "154,217,157",
                vibrantDark: "4,97,14",
              },
            },
            {
              id: "17874560451018069",
              timestamp: "2024-04-12T06:05:48+0000",
              permalink: "https://www.instagram.com/p/C5ppbY1OyE1/",
              mediaType: "CAROUSEL_ALBUM",
              mediaUrl:
                "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/437115978_680312300813911_9068484753862033286_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=ZT45R-jJOT0Q7kNvgEKYkJO&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYDD4aoIcnxb5KvgXDkOn1q7y8_6IoVJHas69JKxOvCWjg&oe=66E17986",
              sizes: {
                small: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17874560451018069/small.webp",
                  height: 400,
                  width: 320,
                },
                medium: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17874560451018069/medium.webp",
                  height: 700,
                  width: 560,
                },
                large: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17874560451018069/large.webp",
                  height: 1000,
                  width: 800,
                },
                full: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17874560451018069/full.webp",
                  height: 1800,
                  width: 1440,
                },
              },
              caption:
                "Hey everyone for throw back Thursday \nBack in February our team leads met with other spenders on growing our club and building the rover!",
              prunedCaption:
                "Hey everyone for throw back Thursday \nBack in February our team leads met with other spenders on growing our club and building the rover!",
              hashtags: [],
              mentions: [],
              colorPalette: {
                dominant: "180,185,179",
                muted: "150,118,103",
                mutedLight: "173,197,205",
                mutedDark: "92,65,58",
                vibrant: "8,180,224",
                vibrantLight: "144,228,210",
                vibrantDark: "7,119,150",
              },
              children: [
                {
                  id: "17975209343535672",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/437115978_680312300813911_9068484753862033286_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=ZT45R-jJOT0Q7kNvgEKYkJO&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYDD4aoIcnxb5KvgXDkOn1q7y8_6IoVJHas69JKxOvCWjg&oe=66E17986",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17975209343535672/small.webp",
                      height: 400,
                      width: 320,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17975209343535672/medium.webp",
                      height: 700,
                      width: 560,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17975209343535672/large.webp",
                      height: 1000,
                      width: 800,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17975209343535672/full.webp",
                      height: 1800,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "180,185,179",
                    muted: "150,118,103",
                    mutedLight: "173,197,205",
                    mutedDark: "92,65,58",
                    vibrant: "8,180,224",
                    vibrantLight: "144,228,210",
                    vibrantDark: "7,119,150",
                  },
                },
                {
                  id: "17921230118885059",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/437110854_2826668494153838_8962898006404077657_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=18de74&_nc_ohc=-vBNIy6GoLMQ7kNvgFzAaem&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYB5OO7V7g-jro-Zcy173vUSfTr2PCuTVvMGrS6Zn6-CEQ&oe=66E173BB",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17921230118885059/small.webp",
                      height: 400,
                      width: 321,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17921230118885059/medium.webp",
                      height: 700,
                      width: 561,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17921230118885059/large.webp",
                      height: 1000,
                      width: 802,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17921230118885059/full.webp",
                      height: 1796,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "195,189,180",
                    muted: "154,114,96",
                    mutedLight: "215,188,176",
                    mutedDark: "86,58,43",
                    vibrant: "207,43,57",
                    vibrantLight: "244,192,177",
                    vibrantDark: "10,117,149",
                  },
                },
                {
                  id: "17980324157665262",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/437463547_469902465368028_3833282989278646974_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=sIvrH43SXFcQ7kNvgGzALYS&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYBaxQqUqKE6O4CSaD-sVBwMgruXc7aSdYWV3J4EZVDCjw&oe=66E14F65",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17980324157665262/small.webp",
                      height: 400,
                      width: 320,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17980324157665262/medium.webp",
                      height: 700,
                      width: 560,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17980324157665262/large.webp",
                      height: 1000,
                      width: 800,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17980324157665262/full.webp",
                      height: 1800,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "201,194,185",
                    muted: "153,133,113",
                    mutedLight: "200,193,179",
                    mutedDark: "98,72,65",
                    vibrant: "45,189,86",
                    vibrantLight: "240,201,157",
                    vibrantDark: "34,97,174",
                  },
                },
              ],
            },
            {
              id: "17998096463469147",
              timestamp: "2023-11-17T05:43:04+0000",
              permalink: "https://www.instagram.com/p/CzvF-R9O0Ye/",
              mediaType: "CAROUSEL_ALBUM",
              mediaUrl:
                "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/402445421_873512270770347_496016513768999609_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=79Hj6qzQxY4Q7kNvgFWiO81&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYBael-bD7lRlmaF4ZNWcuAf7EcU4nzoN0sRr9Byu4284A&oe=66E14AFD",
              sizes: {
                small: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17998096463469147/small.webp",
                  height: 300,
                  width: 400,
                },
                medium: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17998096463469147/medium.webp",
                  height: 525,
                  width: 700,
                },
                large: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17998096463469147/large.webp",
                  height: 750,
                  width: 1000,
                },
                full: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17998096463469147/full.webp",
                  height: 1080,
                  width: 1440,
                },
              },
              caption:
                "We’re excited to move operations to Innovation Hall next year!",
              prunedCaption:
                "We’re excited to move operations to Innovation Hall next year!",
              hashtags: [],
              mentions: [],
              colorPalette: {
                dominant: "206,197,148",
                muted: "174,126,93",
                mutedLight: "189,177,137",
                mutedDark: "87,69,41",
                vibrant: "237,223,58",
                vibrantLight: "234,211,153",
                vibrantDark: "116,28,28",
              },
              children: [
                {
                  id: "18021014392886706",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/402445421_873512270770347_496016513768999609_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=79Hj6qzQxY4Q7kNvgFWiO81&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYBael-bD7lRlmaF4ZNWcuAf7EcU4nzoN0sRr9Byu4284A&oe=66E14AFD",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18021014392886706/small.webp",
                      height: 300,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18021014392886706/medium.webp",
                      height: 525,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18021014392886706/large.webp",
                      height: 750,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18021014392886706/full.webp",
                      height: 1080,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "206,197,148",
                    muted: "174,126,93",
                    mutedLight: "189,177,137",
                    mutedDark: "87,69,41",
                    vibrant: "237,223,58",
                    vibrantLight: "234,211,153",
                    vibrantDark: "116,28,28",
                  },
                },
                {
                  id: "17978296907399238",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/402529926_3449704905341273_6938394136218710453_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=2aNelt90DCQQ7kNvgEdAkDi&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYCJ7LXeVPIcP1zwD4Ac-mD8ghdigwsSv7VZAZ5DgvTsvg&oe=66E16552",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17978296907399238/small.webp",
                      height: 300,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17978296907399238/medium.webp",
                      height: 525,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17978296907399238/large.webp",
                      height: 750,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17978296907399238/full.webp",
                      height: 1080,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "42,38,29",
                    muted: "84,118,156",
                    mutedLight: "196,197,178",
                    mutedDark: "48,70,84",
                    vibrant: "204,140,28",
                    vibrantLight: "231,184,85",
                    vibrantDark: "32,117,78",
                  },
                },
                {
                  id: "18017188774777989",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/402473889_1377316493210872_7380323103615880374_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=18de74&_nc_ohc=DOmg4DTrv1YQ7kNvgGRzYYQ&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYCT5r00pCtyKXY5XM60KW4H30mmAh6qAWqNn3leuHMxXw&oe=66E17127",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18017188774777989/small.webp",
                      height: 300,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18017188774777989/medium.webp",
                      height: 525,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18017188774777989/large.webp",
                      height: 750,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18017188774777989/full.webp",
                      height: 1080,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "48,53,53",
                    muted: "162,136,104",
                    mutedLight: "204,195,183",
                    mutedDark: "87,68,61",
                    vibrant: "106,168,195",
                    vibrantLight: "216,195,167",
                    vibrantDark: "38,77,94",
                  },
                },
                {
                  id: "17988144974261988",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/403664087_724330282873271_5289379631619760876_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=6v_76GJOS70Q7kNvgGtnvVh&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYAPLWelwBGPT4P6cKg9eU7nrBiJBHPGhzVC7kQv0fwfKg&oe=66E15D2B",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17988144974261988/small.webp",
                      height: 300,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17988144974261988/medium.webp",
                      height: 525,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17988144974261988/large.webp",
                      height: 750,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17988144974261988/full.webp",
                      height: 1080,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "172,160,139",
                    muted: "163,147,115",
                    mutedLight: "199,183,157",
                    mutedDark: "67,71,82",
                    vibrant: "58,134,196",
                    vibrantLight: "150,191,224",
                    vibrantDark: "30,69,102",
                  },
                },
                {
                  id: "18394628896029074",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/403176364_1443013792943186_1564157057910970133_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=CN1Om4Urn3cQ7kNvgGa5rAS&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYCEk7ZWlviB12eeVECJIofXtczO3Hg9OxEgSERst-3hWA&oe=66E150A4",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18394628896029074/small.webp",
                      height: 300,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18394628896029074/medium.webp",
                      height: 525,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18394628896029074/large.webp",
                      height: 750,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18394628896029074/full.webp",
                      height: 1080,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "161,143,119",
                    muted: "162,142,115",
                    mutedLight: "217,198,174",
                    mutedDark: "79,66,56",
                    vibrant: "212,140,68",
                    vibrantLight: "250,230,171",
                    vibrantDark: "128,86,45",
                  },
                },
                {
                  id: "17939652581756405",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-1.cdninstagram.com/v/t51.29350-15/402787401_1641519869708185_954509956924647850_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=18de74&_nc_ohc=-hCPwOU4aCAQ7kNvgGDovjo&_nc_ht=scontent-iad3-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYDjTfndlSqiICuWQA0b-xm-nZF54mKp6QriZqc_jP1LSQ&oe=66E14A4B",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17939652581756405/small.webp",
                      height: 300,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17939652581756405/medium.webp",
                      height: 525,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17939652581756405/large.webp",
                      height: 750,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17939652581756405/full.webp",
                      height: 1080,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "50,43,29",
                    muted: "151,137,89",
                    mutedLight: "196,192,180",
                    mutedDark: "78,67,51",
                    vibrant: "192,146,26",
                    vibrantLight: "219,187,126",
                    vibrantDark: "28,12,4",
                  },
                },
                {
                  id: "18075928741390390",
                  mediaType: "IMAGE",
                  mediaUrl:
                    "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/402746327_1277141289578155_6981100910608435662_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=yIUkAq-xlawQ7kNvgEXNtFf&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYBmVdkWc5NxA1FRlqMq1WYNR_Lhghj40aNDUE1QL1G6lA&oe=66E1616E",
                  sizes: {
                    small: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18075928741390390/small.webp",
                      height: 300,
                      width: 400,
                    },
                    medium: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18075928741390390/medium.webp",
                      height: 525,
                      width: 700,
                    },
                    large: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18075928741390390/large.webp",
                      height: 750,
                      width: 1000,
                    },
                    full: {
                      mediaUrl:
                        "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/18075928741390390/full.webp",
                      height: 1080,
                      width: 1440,
                    },
                  },
                  colorPalette: {
                    dominant: "142,141,134",
                    muted: "85,122,154",
                    mutedLight: "200,186,158",
                    mutedDark: "75,71,58",
                    vibrant: "200,180,132",
                    vibrantLight: "154,233,243",
                    vibrantDark: "91,76,40",
                  },
                },
              ],
            },
            {
              id: "17921293514731954",
              timestamp: "2023-11-17T02:48:47+0000",
              permalink: "https://www.instagram.com/p/CzuyBt2LXFg/",
              mediaType: "IMAGE",
              mediaUrl:
                "https://scontent-iad3-2.cdninstagram.com/v/t51.29350-15/403615549_841654931034309_7989333859022898254_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=8kcyKthls_MQ7kNvgFiXxqP&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=ADCSPVobiBKEpnvGXpCGDgJ&oh=00_AYDT-9Gw41heM--_l_VG0Aq6lvwGtDbEnTv6Rxr7Ek5TTQ&oe=66E163F4",
              sizes: {
                small: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17921293514731954/small.webp",
                  height: 300,
                  width: 400,
                },
                medium: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17921293514731954/medium.webp",
                  height: 525,
                  width: 700,
                },
                large: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17921293514731954/large.webp",
                  height: 750,
                  width: 1000,
                },
                full: {
                  mediaUrl:
                    "https://behold.pictures/enil5DiXPna43gzA0az2tHxse8g1/RDUuEeFTbzDrOFPKj7TZ/17921293514731954/full.webp",
                  height: 1080,
                  width: 1440,
                },
              },
              caption: "Our new home!",
              prunedCaption: "Our new home!",
              hashtags: [],
              mentions: [],
              colorPalette: {
                dominant: "44,49,49",
                muted: "91,133,154",
                mutedLight: "199,192,177",
                mutedDark: "78,62,56",
                vibrant: "215,112,96",
                vibrantLight: "162,199,222",
                vibrantDark: "105,37,26",
              },
            },
          ],
        }); //await response.json();
        localStorage.setItem("instagramResponse", data);
      } else {
        throw new Error("Error recieving behold fetch");
      }
    }
    JSON.parse(data).posts.forEach((post) => {
      const link = $(`<a href = '${post.permalink}' target = '_blank'></a>`);
      const icon = $(
        `<img class = "postIconOverlay" src = "assets/images/icons/InstagramIcon.svg" alt = "Instagram icon"/>`
      );
      const picture = $(`<img />`);

      picture.attr("src", post.sizes.small.mediaUrl);
      picture.attr(
        "srcset",
        `${post.sizes.small.mediaUrl} 768w, ${post.sizes.medium.mediaUrl} 1200w`
      );
      picture.attr("alt", post.caption);
      link.append(icon);
      link.append(picture);
      photoContainer.append(link);
    });
  } catch (err) {
    console.log(err);
    const errorMessage = $("<h4>Error Loading Instagram Feed</h4>");
    const refreshButton = $("<button>Refresh</button>");
    refreshButton.click(getInstagramPosts);
    photoContainer.append(errorMessage);
    photoContainer.append(refreshButton);
  }
}
getInstagramPosts();
