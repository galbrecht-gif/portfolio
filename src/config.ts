// Edite aqui seus dados reais.
export const PROFILE = {
  name: "Gabriel José Albrecht",
  handle: "Gabriel",
  email: "gabriel.jose6421@gmail.com",
  phone: "+55 (19) 99879-8848",
  whatsapp: "5519998798848", // DDI + DDD + número, só dígitos
  timezone: "America/Sao_Paulo",
  city: "São Paulo, BR",
  socials: {
    github: "https://github.com/settings/profile",
    linkedin: "https://br.linkedin.com/in/gabriel-jose-albrecht-a97637430",
  },
};

export const waLink = (text: string) =>
  `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(text)}`;
