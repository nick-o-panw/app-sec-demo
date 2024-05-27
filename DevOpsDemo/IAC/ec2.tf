resource "aws_instance" "web_host" {
  # ec2 have plain text secrets
  ami           = "${var.ami}"
  instance_type = "t2.nano"

  vpc_security_group_ids = [
    "${aws_security_group.web-node.id}"]
  subnet_id = "${aws_subnet.web_subnet.id}"
  user_data = "phpdefine('DB_SERVER', 'aws_db_instance.default.endpoint');define('DB_USERNAME', 'aws_db_instance.default.username');define('DB_PASSWORD', Aa1234321Bb);define('DB_DATABASE', 'aws_db_instance.default.name');?>EnDsudo mv /tmp/dbinfo.inc /var/www/inc sudo chown root"
  tags = merge({
    Name = "${local.resource_prefix.value}-ec2"
  }, {
    git_commit           = "d68d2897add9bc2203a5ed0632a5cdd8ff8cefb0"
    git_file             = "terraform/aws/ec2.tf"
    git_last_modified_at = "2020-06-16 14:46:24"
    git_last_modified_by = "jmagee@paloaltonetworks.com"
    git_modifiers        = "jmagee"
    git_org              = "bridgecrewio"
    git_repo             = "terragoat"
    yor_trace            = "347af3cd-4f70-4632-aca3-4d5e30ffc0b6"
  })
}
