import { Link } from "gatsby";
import React from "react";
import { Section } from "../common";
import ThemeToggle from "./ThemeToggle";

function MDHeader() {
  return (
    <header class="lg:block hidden">
      <Section>
        <div className="mt-10">
          <Link to="/">
            <span className="text-4xl font-bold">Daniel Wirtz</span>
          </Link>
        </div>
        <div class="flex justify-between items-center my-6 border-b-2 border-primary-400 pb-6">
          <nav class="-ml-4">
            {[
              {
                route: `/`,
                title: `Home`
              },
              {
                route: `/reading`,
                title: `Reading`
              }
            ].map(link => (
              <Link
                className="text-2xl hover:bg-neutral-100 dark-hover:bg-neutral-800 rounded px-4 py-2 mr-2"
                key={link.title}
                to={link.route}
                activeClassName="font-semibold text-primary-400"
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </Section>
    </header>
  );
}

export default MDHeader;