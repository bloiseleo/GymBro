plugins {
	java
	id("org.springframework.boot") version "3.4.4"
	id("io.spring.dependency-management") version "1.1.7"
	id("org.flywaydb.flyway") version "10.1.0"
}

group = "com.github.bloiseleo.gymbro"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

buildscript {
	dependencies {
		classpath("org.flywaydb:flyway-database-postgresql:10.1.0")
	}
}

flyway {
	url = "jdbc:postgresql://localhost:5432/gymbro"
	user = "root"
	password = "root"
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.flywaydb:flyway-core")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.boot:spring-boot-starter-security")
	testImplementation("org.springframework.security:spring-security-test")
	developmentOnly("org.flywaydb:flyway-database-postgresql:10.1.0")
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	runtimeOnly("org.postgresql:postgresql")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
	implementation("com.auth0:java-jwt:4.5.0")
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.6")
	testImplementation("org.mockito:mockito-core:5.+")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
