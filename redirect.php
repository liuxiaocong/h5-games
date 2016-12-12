<?php
$query = (strlen($_SERVER['QUERY_STRING']) > 0) ? ($_SERVER['QUERY_STRING']) : "";
header("Location: 10001249/index.html?$query");
//header("Location: 10000201/index.html?$query");

/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 9/23/14
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */
?>