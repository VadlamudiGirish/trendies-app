import { Container, Text, Group } from "@mantine/core";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-400 py-4 z-50">
      <Container
        size="lg"
        className="flex flex-col md:flex-row items-center justify-between"
      >
        <Text size="sm">
          &copy; 2025 Trendies Morocco. All rights reserved.
        </Text>
        <Group gap="md" className="mt-2 md:mt-0">
          <Link href="#" className="hover:text-white text-sm">
            Help Center
          </Link>
          <Link href="#" className="hover:text-white text-sm">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-white text-sm">
            Privacy Policy
          </Link>
        </Group>
      </Container>
    </footer>
  );
}
