package com.project.Ai_Content_Generation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv; // Import Dotenv

@SpringBootApplication
public class AiContentGenerationApplication {

	public static void main(String[] args) {
		// Load environment variables from .env file and propagate to System properties for Spring
		Dotenv dotenv = Dotenv.configure().ignoreIfMalformed().ignoreIfMissing().load();
		dotenv.entries().forEach(entry -> {
			// Make variables available for Spring placeholder resolution
			System.setProperty(entry.getKey(), entry.getValue());
		});
		SpringApplication.run(AiContentGenerationApplication.class, args);
	}

}
