
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Abogados
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Abogados
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Abogados` DEFAULT CHARACTER SET utf8 ;
USE `Abogados` ;

-- -----------------------------------------------------
-- Table `Abogados`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Cliente` (
  `idCliente` INT UNSIGNED NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `ApellidoPaterno` VARCHAR(45) NOT NULL,
  `ApellidoMaterno` VARCHAR(45) NOT NULL,
  `Caso` VARCHAR(45) NOT NULL,
  `numCel` INT(10) NOT NULL,
  PRIMARY KEY (`idCliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Abogados`.`Cubiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Cubiculo` (
  `idCubiculo` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCubiculo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Abogados`.`Abogado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Abogado` (
  `idAbogado` INT NOT NULL,
  `AbogadoNombre` VARCHAR(45) NOT NULL,
  `Documentacion` VARCHAR(45) NOT NULL,
  `SeguimientoDemanda(estatus)` VARCHAR(45) NULL,
  PRIMARY KEY (`idAbogado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Abogados`.`Demanda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Demanda` (
  `idDemanda` INT NOT NULL,
  `Concurrencias` VARCHAR(45) NOT NULL,
  `Audiencias` VARCHAR(45) NULL,
  `EnvioDeOficios` VARCHAR(45) NULL,
  `ContestacionDeOficios` VARCHAR(45) NULL,
  `CitasJuzgado` DATE NULL,
  `Decretos` VARCHAR(45) NULL,
  `DecretosDefinitivos` VARCHAR(45) NULL,
  `Eventos` VARCHAR(45) NULL,
  PRIMARY KEY (`idDemanda`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Abogados`.`Cita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Abogados`.`Cita` (
  `idCita` INT NOT NULL,
  `Fecha` DATE NULL,
  `Cliente_cita` INT UNSIGNED NULL,
  `Abogado_cita` INT NULL,
  `Demanda_cita` INT NULL,
  `Cubiculo_cita` INT NULL,
  `Estado` VARCHAR(45) NULL,
  `Motivo` VARCHAR(45) NULL,
  PRIMARY KEY (`idCita`),
  INDEX `fk_Cliente_Cita_idx` (`Cliente_cita` ASC) ,
  INDEX `fk_Abogado_Cita_idx` (`Abogado_cita` ASC) ,
  INDEX `fk_Cubiculo_Cita_idx` (`Cubiculo_cita` ASC) ,
  INDEX `fk_Demanda_Cita_idx` (`Demanda_cita` ASC) ,
  CONSTRAINT `fk_Cliente_Cita`
    FOREIGN KEY (`Cliente_cita`)
    REFERENCES `Abogados`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Abogado_Cita`
    FOREIGN KEY (`Abogado_cita`)
    REFERENCES `Abogados`.`Abogado` (`idAbogado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cubiculo_Cita`
    FOREIGN KEY (`Cubiculo_cita`)
    REFERENCES `Abogados`.`Cubiculo` (`idCubiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Demanda_Cita`
    FOREIGN KEY (`Demanda_cita`)
    REFERENCES `Abogados`.`Demanda` (`idDemanda`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
