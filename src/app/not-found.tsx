import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cta, external, routes } from "@/data/site";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <p className="font-mono text-eyebrow uppercase text-muted">404</p>
      <h1 className="mt-5 text-title text-ink">This page has moved.</h1>
      <p className="measure mt-6 text-lead text-muted">
        The link you followed does not point anywhere on the new site. The
        studios, rates and booking are all still here.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href={external.booking}>{cta.book}</Button>
        <Button href={routes.studios} variant="outline">
          {cta.studios}
        </Button>
      </div>
    </Container>
  );
}
