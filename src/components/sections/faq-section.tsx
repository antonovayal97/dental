import { DemoBadge } from '@/components/shared/demo-badge'
import { JsonLd } from '@/components/shared/json-ld'
import { SlideUp } from '@/components/shared/motion'
import { Accordion } from '@/components/ui/accordion'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { DEMO_FAQS } from '@/lib/demo-content'
import { faqPageJsonLd } from '@/lib/seo/jsonld'
import { cn } from '@/lib/utils'

export type FaqItem = {
  id: string
  question: string
  answer: string
  isDemo?: boolean
}

export type FaqSectionProps = {
  faqs?: FaqItem[] | null
  eyebrow?: string
  title?: string
  description?: string
  includeJsonLd?: boolean
  className?: string
}

const DEMO_ITEMS: FaqItem[] = DEMO_FAQS.map((faq) => ({
  id: faq.id,
  question: faq.question,
  answer: faq.answer,
  isDemo: faq.isDemo,
}))

export function FaqSection({
  faqs,
  eyebrow = 'FAQ',
  title = 'Частые вопросы',
  description = 'Короткие ответы о первом визите, подготовке и стоимости — без лишней воды.',
  includeJsonLd = true,
  className,
}: FaqSectionProps) {
  const items = faqs === undefined || faqs === null ? DEMO_ITEMS : faqs
  const usingDemo = faqs == null || items.some((item) => item.isDemo)

  const jsonLd =
    includeJsonLd && !usingDemo && items.length > 0
      ? faqPageJsonLd(
          items.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
          { isDemo: false },
        )
      : null

  return (
    <section
      className={cn('section-padding bg-surface/50', className)}
      aria-labelledby="faq-heading"
    >
      {jsonLd ? <JsonLd id="faq-jsonld" data={jsonLd} /> : null}

      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            {usingDemo ? <DemoBadge className="mt-4" /> : null}
          </div>

          <SlideUp>
            {items.length === 0 ? (
              <EmptyState
                title="Вопросы скоро появятся"
                description="Раздел FAQ наполняется. Если нужно уточнение — напишите или запишитесь на консультацию."
              />
            ) : (
              <div className="rounded-2xl border border-border/80 bg-card px-5 sm:px-7">
                <Accordion
                  items={items.map((item) => ({
                    id: item.id,
                    title: item.question,
                    content: (
                      <div className="space-y-3">
                        <p>{item.answer}</p>
                        {item.isDemo ? <DemoBadge /> : null}
                      </div>
                    ),
                  }))}
                />
              </div>
            )}
          </SlideUp>
        </div>
        <span id="faq-heading" className="sr-only">
          {title}
        </span>
      </Container>
    </section>
  )
}
