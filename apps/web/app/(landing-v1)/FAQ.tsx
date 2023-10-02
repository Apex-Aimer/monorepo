import cx from 'clsx'

import { AccordionItem } from './components/Accordion'

export function FAQ() {
  return (
    <section
      className={cx(
        'bg-bg-primary flex flex-row overflow-hidden pt-20 md:pt-32'
      )}
    >
      <div className="bg-bg-primary flex-[1_0_0%] " />
      <div className="flex max-w-screen-md flex-[1_1_100%] flex-col gap-7 px-7">
        <h2 className="text-text-primary font-prime text-center text-3xl">
          FAQ
        </h2>
        <div className="flex flex-col gap-7">
          <AccordionItem
            label="Why do I need to warm-up? I just want to play the game."
            initiallyOpen
          >
            Jumping straight into the game without proper warm-up can lead to
            quick eliminations early in the game, whiffing shots, losing 1v1 and
            so on. All that lead to frustration, definitely not why you open the
            game.
          </AccordionItem>
          <AccordionItem label="I’m warming up in the game, why do I need to do that in the firing range?">
            <ul className="list-inside list-disc">
              <li className="text-text-primary font-prime mb-2 text-lg">
                It takes more time. First instead of shooting you have to loot
                (actually even looting can be less efficient, as your movement
                would be “clunky”), second, far less shooting (even on Mixtape)
                with valuable feedback (it’s much easier to practise recoil with
                visual feedback).
              </li>
              <li className="text-text-primary font-prime mb-2 text-lg">
                Quick elimination or whiffing because of the “stiffness” leads
                to early frustration, that would affect whole experience for the
                day.
              </li>
              <li className="text-text-primary font-prime text-lg">
                With limited time to play (ie you playing after a work or
                studying), every game matters. Warm-up reduces a chance to have
                really bad games.
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem label="I’m warming up in the firing range myself, why do I need the app for it?">
            <ul className="list-inside list-disc">
              <li className="text-text-primary font-prime mb-2 text-lg">
                We packed drills for different skills for you in routines. The
                app helps you to follow timing and do not spend much time on
                firing range, better you play the game.
              </li>
              <li className="text-text-primary font-prime mb-2 text-lg">
                It makes a practice versatile. For example, tracking is a
                crucial skill in Apex Legends, more than in FPS shooters like
                CS:GO or Valorant, but I personally always forget to do that and
                start other tasks. The app helps me not to forget something.
              </li>
              <li className="text-text-primary font-prime text-lg">
                If you want to work on some specific skills, proper warm-up can
                help you to do your drills better. It’s like you warm-up in a
                gym before hard work.
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem label="I'd rather practise in AimLabs or Kovaak’s, why do I need the app?">
            <ul className="list-inside list-disc">
              <li className="text-text-primary font-prime mb-2 text-lg">
                Not every platform has it, so if you’re Xbox or PS user, you
                actually don’t have much choice. Unless you’re up to challenge
                of connecting controller to PC and being able to properly set
                sensitivity and other complicated settings.
              </li>
              <li className="text-text-primary font-prime text-lg">
                Some things, like recoil or movement, can’t be practised in
                separate apps, so anyway, you might want to warm-up in the
                firing range to, get feeling of weapons before the game.
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem label="I’ve already watched warm-ups on YouTube, why do I need the app?">
            <ul className="list-inside list-disc">
              <li className="text-text-primary font-prime mb-2 text-lg">
                There’re{' '}
                <a
                  href="https://www.learningguild.com/articles/1379/brain-science-the-forgetting-curvethe-dirty-secret-of-corporate-training/"
                  className="text-accent-secondary"
                >
                  a research that within a week people forget about 90 percent
                  of new information
                </a>
                , so you probably going to forget some drills. That’s actually
                exactly why I made the app, since I watched a lot of videos from
                players like <strong>Verhulst</strong>,{' '}
                <strong>NiceWigg</strong> and others, but I kept forgetting some
                drills. With the app you don’t need to remember what to do and
                in what order, leave it to machine and just have fun.
              </li>
              <li className="text-text-primary font-prime text-lg">
                In addition to that, the app is rotating drills every day to
                keep it engaging.
              </li>
            </ul>
          </AccordionItem>
        </div>
      </div>
      <div className="bg-bg-primary flex-[1_0_0%]" />
    </section>
  )
}
