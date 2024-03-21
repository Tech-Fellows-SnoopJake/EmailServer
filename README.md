# SnoopJake Email MONOREPO

---

<p align="center">
<img src="https://github.com/Tech-Fellows-SnoopJake/EmailServer/assets/49454068/b2438f2d-fa21-405e-94ed-c5e25c4140ea"  width="300" height="300" />
</p>
<p align="center"><i>Our trustworthy messenger is here to take care of your mails, SnoopJake</i></p>
<br>
<br>

**SnoopJake Email** is an email app made with React.ts + Vite and Django.

We developed it for the sake of training ourselves, and further develop the skills required to work as a team on the modern software development workflows.
_(Like CI/CD, QA workflows, AWS and project management with JIRA)_

This repository contains both the `frontend` content of our email client and the `backend` of our application, as a **Monorepo** application.

Each of these `front` and `back` repos contain their respectives `README` files that further explain the details of their respective domain.

Cheers!

## HG 02 Improvements

This begins here.

- Sonar configuration.
- First test.
  - changes in EC2 id, and versión of action. -v to debug.
  - ~~Set up instance EC2 as Secrets~~
  - New try with the instance on code
    - sudo apt-get update
      sudo apt-get install docker.io
    - sudo usermod -aG docker ubuntu
  - Change in ssh routes of command in front and back.
    - ~~add line to login docker GHCR~~
    - Login direct GHCR from EC2 intance
  - set Var BD schema
    - test_jake
    - postgres
    - JPy5jKpp
  - change without sudo.
  - Set files envVars and detener\*
    <<<<<<< HEAD
  - # Set the RDS Instance as public
        - Needed execution permissions `chmod +x namefile`
  - Set the RDS Instance as public
    - Connection done. Set acl 5432
- Change instance RDS Mysql

> [!IMPORTANT]
> We need to set the host of the DB, and de host of the EC2 every time that restart the instances.
> In CD front y back and change the host DB int the file of envVars.txt into the EC2 Instance.
