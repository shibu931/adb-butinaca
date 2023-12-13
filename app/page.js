import FAQs from '@/Components/FAQs'
import ProductCard from '@/Components/ProductCard'
import Image from 'next/image'

const faqs=[
  {
    id: "FAQ001",
    title: "What are research chemicals?",
    content: "Research chemicals, often abbreviated as RCs, refer to substances used by scientists and researchers for experimental purposes. These chemicals are not intended for human consumption and are primarily employed in laboratories to explore new compounds, study reactions, and advance scientific understanding. It's crucial to emphasize that these chemicals should be handled with care and used in controlled environments by trained professionals."
  },
  {
    id: "FAQ002",
    title: "Are research chemicals legal?",
    content: "The legal status of research chemicals varies by jurisdiction. It is imperative for users to be aware of and comply with local regulations regarding the purchase, possession, and use of these substances. While some research chemicals are legal for scientific purposes, others may be subject to strict regulations or even prohibition. Customers should thoroughly research and understand the legal landscape in their specific location before acquiring any research chemicals."
  },
  {
    id: "FAQ003",
    title: "How should research chemicals be handled safely?",
    content: "Safety is of utmost importance when working with research chemicals. Always follow proper laboratory protocols, including wearing appropriate protective gear such as gloves and goggles. Additionally, work in a well-ventilated area, and avoid direct skin contact or inhalation of fumes. It is essential to have a thorough understanding of the properties of each chemical being used and to follow guidelines provided by reputable sources. In case of any accidents or spills, have the necessary safety equipment and procedures in place."
  },
  {
    id: "FAQ004",
    title: "Can research chemicals be used for recreational purposes?",
    content: "No, research chemicals are not intended for recreational use. These substances are designed for scientific research purposes only and should never be ingested, inhaled, or used in any manner for recreational or personal purposes. Attempting to use research chemicals recreationally can have severe and unpredictable consequences on health and well-being. Always adhere to ethical and legal standards when working with these substances."
  },
  {
    id: "FAQ005",
    title: "Where can I purchase research chemicals?",
    content: "Research chemicals should only be purchased from reputable and licensed suppliers who adhere to strict quality standards. It is advisable to choose suppliers with a proven track record in providing high-quality, authentic research chemicals. Always verify the legitimacy of a supplier, check customer reviews, and ensure that the supplier complies with legal regulations. Engaging with trustworthy suppliers is crucial to obtaining reliable and safe research chemicals for scientific experimentation."
  }
]


export default function Home() {
  return (
    <>
      <section className='px-6 md:px-20'>
        <ProductCard />
      </section>
      <section className='px-6 md:px-20 my-20'>
        <div className='grid grid-cols-1 lg:grid-cols-3'>
          <div className='mx-auto'>
            <Image
              src="/assets/img/faqs.webp"
              width={500}
              height={500}
              alt='FAQS'
            />
          </div>
          <div className="col-span-2">
            <FAQs faqs={faqs}/>
          </div>
        </div>
      </section>
    </>
  )
}
