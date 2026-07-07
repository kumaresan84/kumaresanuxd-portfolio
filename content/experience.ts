export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Associate Manager - Experience Design",
    company: "Infosys Ltd",
    location: "Bangalore, Karnataka",
    period: "Sep 2018 - Current",
    current: true,
  },
  {
    role: "UX Designer",
    company: "Indecomm Global Services",
    location: "Bangalore, Karnataka",
    period: "Jan 2017 - Sep 2018",
  },
  {
    role: "UX Designer",
    company: "Obssessory Online Services",
    location: "Bangalore, Karnataka",
    period: "Sep 2016 - Jan 2017",
  },
  {
    role: "UI/UX Designer",
    company: "Onepoint Global",
    location: "Bangalore, Karnataka",
    period: "Mar 2014 - Aug 2016",
  },
  {
    role: "UI/UX Designer",
    company: "iThoughtz Technologies",
    location: "Chennai, Tamilnadu",
    period: "Aug 2011 - Feb 2014",
  },
  {
    role: "Graphic Designer",
    company: "The Connectorz",
    location: "Chennai, Tamilnadu",
    period: "Sep 2009 - Jul 2011",
  },
];
