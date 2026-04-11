export const testimonials = [
  {
    quote:
      "Des que je l'ai portee, j'ai senti la difference. La coupe est sublime, le tombe est magnifique et l'allure est immediatement tres chic.",
    quoteEn:
      "As soon as I wore it, I felt the difference. The cut is stunning, the drape is beautiful and the look feels instantly chic.",
    name: "Samira B.",
    city: "Paris"
  },
  {
    quote:
      "On sent un vrai travail de maison de mode. Les finitions sont delicates, les couleurs sont raffinees et chaque piece inspire l'elegance.",
    quoteEn:
      "You can feel true fashion-house craftsmanship. The finishes are delicate, the colors refined and every piece inspires elegance.",
    name: "Amina K.",
    city: "Lyon"
  },
  {
    quote:
      "Tout est soigne, du vetement jusqu'a la presentation. L'experience est elegante du debut a la fin, et la qualite est vraiment au rendez-vous.",
    quoteEn:
      "Everything is carefully done, from the garment to the presentation. The whole experience feels elegant from start to finish, and the quality is truly there.",
    name: "Maryam D.",
    city: "Bruxelles"
  }
];

export function getMainNavItems(isEnglish) {
  return [
    { href: "/", label: isEnglish ? "Home" : "Accueil" },
    { href: "/boutique", label: isEnglish ? "Boutique" : "Boutique" },
    { href: "/a-propos", label: isEnglish ? "About" : "A propos" },
    { href: "/avis", label: isEnglish ? "Reviews" : "Avis" },
    { href: "/contact", label: isEnglish ? "Contact" : "Contact" }
  ];
}
