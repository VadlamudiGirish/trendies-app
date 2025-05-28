import { Container, Title, Text } from "@mantine/core";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50 text-gray-900 flex flex-col items-center justify-center">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white py-20 w-full"
        >
          <Container size="md" className="text-center">
            <Title order={1} className="text-5xl font-extrabold mb-4">
              Luxury Reinvented. Exclusivity at Your Fingertips.
            </Title>
            <Text size="lg" className="mb-8">
              Welcome to Trendies, Morocco’s premier luxury resale marketplace.
            </Text>
          </Container>
        </motion.section>
      </main>
    </div>
  );
}
